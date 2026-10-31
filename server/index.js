import express from "express";
import cors from "cors";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   CORS CONFIGURATION
========================= */
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://elliefranzgabuts-arch.github.io",
    "https://portfolio.elliefranzgabuts.workers.dev",
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.warn(`Blocked CORS origin: ${origin}`);
        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());

/* =========================
   SUPABASE POSTGRESQL
========================= */
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "postgres",
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error.message);
});

/* =========================
   SUPABASE STORAGE
========================= */
let supabaseClient;
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "project-images";

function getSupabase() {
    if (supabaseClient) return supabaseClient;

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error(
            "Project image storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
        );
    }

    supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    });
    return supabaseClient;
}

/* =========================
   MULTER CONFIGURATION
========================= */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            return callback(null, true);
        }
        return callback(new Error(
            "Only JPG, JPEG, PNG, and WEBP images are allowed."
        ));
    },
});

function makeImagePath(file) {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, extension)
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "project-image";
    return `projects/${Date.now()}-${baseName}${extension}`;
}

async function uploadProjectImage(file) {
    if (!file) return null;

    const client = getSupabase();
    const objectPath = makeImagePath(file);
    const { error } = await client.storage
        .from(STORAGE_BUCKET)
        .upload(objectPath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
            cacheControl: "3600",
        });

    if (error) throw new Error(`Image upload failed: ${error.message}`);

    const { data } = client.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(objectPath);

    if (!data?.publicUrl) {
        await client.storage.from(STORAGE_BUCKET).remove([objectPath]);
        throw new Error("Unable to generate the public project image URL.");
    }

    return { url: data.publicUrl, path: objectPath };
}

function getStorageObjectPath(imageUrl) {
    if (!imageUrl) return null;

    try {
        const parsed = new URL(imageUrl);
        const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
        const index = parsed.pathname.indexOf(marker);
        if (index === -1) return null;
        const objectPath = parsed.pathname.slice(index + marker.length);
        return objectPath ? decodeURIComponent(objectPath) : null;
    } catch {
        return null;
    }
}

async function deleteProjectImage(imageUrl) {
    const objectPath = getStorageObjectPath(imageUrl);
    if (!objectPath) return;

    const { error } = await getSupabase().storage
        .from(STORAGE_BUCKET)
        .remove([objectPath]);

    if (error) {
        console.error("Supabase Storage image cleanup failed:", error.message);
    }
}

async function removeUploadedImage(imagePath) {
    if (!imagePath) return;
    try {
        const { error } = await getSupabase().storage
            .from(STORAGE_BUCKET)
            .remove([imagePath]);
        if (error) console.error("Temporary image cleanup failed:", error.message);
    } catch (error) {
        console.error("Temporary image cleanup failed:", error.message);
    }
}

/* =========================
   ADMIN AUTHENTICATION
========================= */
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token.",
        });
    }

    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not configured.");
        return res.status(500).json({
            success: false,
            message: "Authentication is not configured.",
        });
    }

    try {
        req.admin = jwt.verify(token, JWT_SECRET);
        return next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
}

/* =========================
   ROOT
========================= */
app.get("/", (req, res) => {
    res.json({ success: true, message: "Backend is running!" });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({
            success: true,
            message: "Backend and database are connected.",
        });
    } catch (error) {
        console.error("Health check error:", error);
        res.status(500).json({
            success: false,
            message: "Backend is running but database connection failed.",
        });
    }
});

/* =========================
   ADMIN LOGIN
========================= */
app.post("/api/login", async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required.",
            });
        }

        const adminPassword = process.env.ADMIN_PASSWORD_HASH
            || process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return res.status(500).json({
                success: false,
                message: "Admin password is not configured.",
            });
        }
        if (!JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Authentication is not configured.",
            });
        }

        let passwordMatches = false;
        if (/^\$2[aby]\$/.test(adminPassword)) {
            passwordMatches = await bcrypt.compare(password, adminPassword);
        } else {
            passwordMatches = password === adminPassword;
        }

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
            expiresIn: "2h",
        });

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            ["Admin logged in"]
        );

        res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Login failed." });
    }
});

/* =========================
   ADMIN CHECK
========================= */
app.get("/api/admin/check", authenticateAdmin, (req, res) => {
    res.json({ success: true, authenticated: true });
});

/* =========================
   VISITORS
========================= */
app.post("/api/visitors", async (req, res) => {
    try {
        const { visitorId, path: visitorPath } = req.body;
        if (!visitorId) {
            return res.status(400).json({
                success: false,
                message: "Visitor ID is required.",
            });
        }

        const safePath = visitorPath || "/";
        await pool.query(
            "INSERT INTO visitors (visitor_id, path) VALUES ($1, $2)",
            [visitorId, safePath]
        );

        const uniqueResult = await pool.query(
            `INSERT INTO unique_visitors (visitor_id)
             VALUES ($1)
             ON CONFLICT (visitor_id) DO NOTHING
             RETURNING visitor_id`,
            [visitorId]
        );

        if (uniqueResult.rowCount > 0) {
            await pool.query(
                "UPDATE site_stats SET visitor_count = visitor_count + 1 WHERE id = 1"
            );
        }

        const [statsResult, visitsResult] = await Promise.all([
            pool.query("SELECT visitor_count FROM site_stats WHERE id = 1"),
            pool.query("SELECT COUNT(*) AS total FROM visitors"),
        ]);

        res.json({
            success: true,
            visitorCount: Number(statsResult.rows[0]?.visitor_count || 0),
            totalVisits: Number(visitsResult.rows[0]?.total || 0),
        });
    } catch (error) {
        console.error("Visitor tracking error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to record visitor.",
        });
    }
});

/* =========================
   ANALYTICS
========================= */
app.get("/api/analytics", authenticateAdmin, async (req, res) => {
    try {
        const [
            visitorStats,
            visitStats,
            messageStats,
            projectStats,
            certificateStats,
            recentVisitors,
            recentMessages,
        ] = await Promise.all([
            pool.query("SELECT visitor_count FROM site_stats WHERE id = 1"),
            pool.query("SELECT COUNT(*) AS total FROM visitors"),
            pool.query("SELECT COUNT(*) AS total FROM contact_messages"),
            pool.query("SELECT COUNT(*) AS total FROM projects"),
            pool.query("SELECT COUNT(*) AS total FROM certificates"),
            pool.query("SELECT id, visitor_id, path, visited_at FROM visitors ORDER BY visited_at DESC LIMIT 20"),
            pool.query("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 10"),
        ]);

        res.json({
            success: true,
            analytics: {
                uniqueVisitors: Number(visitorStats.rows[0]?.visitor_count || 0),
                totalVisits: Number(visitStats.rows[0]?.total || 0),
                totalMessages: Number(messageStats.rows[0]?.total || 0),
                totalProjects: Number(projectStats.rows[0]?.total || 0),
                totalCertificates: Number(certificateStats.rows[0]?.total || 0),
                recentVisitors: recentVisitors.rows,
                recentMessages: recentMessages.rows,
            },
        });
    } catch (error) {
        console.error("Analytics error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch analytics.",
        });
    }
});

/* =========================
   CONTACT
========================= */
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required.",
            });
        }

        await pool.query(
            "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
            [name.trim(), email.trim(), message.trim()]
        );
        res.json({ success: true, message: "Message sent successfully." });
    } catch (error) {
        console.error("Contact error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to send message.",
        });
    }
});

app.get("/api/contact", authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC"
        );
        res.json({ success: true, messages: result.rows });
    } catch (error) {
        console.error("Contact fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch messages.",
        });
    }
});

app.delete("/api/contact/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM contact_messages WHERE id = $1 RETURNING id",
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            [`Deleted contact message #${id}`]
        );
        res.json({ success: true, message: "Message deleted successfully." });
    } catch (error) {
        console.error("Contact delete error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete message.",
        });
    }
});

/* =========================
   PROJECTS - PUBLIC
========================= */
app.get("/api/projects", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, title, description, link, image_url, created_at FROM projects ORDER BY created_at DESC"
        );
        res.json({ success: true, projects: result.rows });
    } catch (error) {
        console.error("Projects fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch projects.",
        });
    }
});

/* =========================
   PROJECTS - CREATE
========================= */
app.post(
    "/api/projects",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        let uploadedImage = null;

        try {
            const { title, description, link } = req.body;

            if (!title?.trim() || !description?.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Title and description are required.",
                });
            }

            if (req.file) {
                uploadedImage = await uploadProjectImage(req.file);
            }

            const result = await pool.query(
                `INSERT INTO projects (title, description, link, image_url)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id`,
                [
                    title.trim(),
                    description.trim(),
                    link?.trim() || null,
                    uploadedImage?.url || null,
                ]
            );

            const projectId = result.rows[0].id;

            await pool.query(
                "INSERT INTO admin_activity (activity) VALUES ($1)",
                [`Created project #${projectId}: ${title.trim()}`]
            );

            res.status(201).json({
                success: true,
                message: "Project created successfully.",
                projectId,
                imageUrl: uploadedImage?.url || null,
            });
        } catch (error) {
            if (uploadedImage?.path) {
                await removeUploadedImage(uploadedImage.path);
            }

            console.error("Project create error:", error);
            res.status(500).json({
                success: false,
                message: error.message || "Unable to create project.",
            });
        }
    }
);

/* =========================
   PROJECTS - UPDATE
========================= */
app.put(
    "/api/projects/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        let uploadedImage = null;

        try {
            const { id } = req.params;
            const { title, description, link } = req.body;

            if (!title?.trim() || !description?.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Title and description are required.",
                });
            }

            const existingResult = await pool.query(
                "SELECT image_url FROM projects WHERE id = $1 LIMIT 1",
                [id]
            );

            if (existingResult.rowCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found.",
                });
            }

            const oldImageUrl = existingResult.rows[0].image_url;
            let imageUrl = oldImageUrl;

            if (req.file) {
                uploadedImage = await uploadProjectImage(req.file);
                imageUrl = uploadedImage.url;
            }

            await pool.query(
                `UPDATE projects
                 SET title = $1, description = $2, link = $3, image_url = $4
                 WHERE id = $5`,
                [
                    title.trim(),
                    description.trim(),
                    link?.trim() || null,
                    imageUrl,
                    id,
                ]
            );

            if (uploadedImage && oldImageUrl) {
                await deleteProjectImage(oldImageUrl);
            }

            await pool.query(
                "INSERT INTO admin_activity (activity) VALUES ($1)",
                [`Updated project #${id}: ${title.trim()}`]
            );

            res.json({
                success: true,
                message: "Project updated successfully.",
                imageUrl,
            });
        } catch (error) {
            if (uploadedImage?.path) {
                await removeUploadedImage(uploadedImage.path);
            }

            console.error("Project update error:", error);
            res.status(500).json({
                success: false,
                message: error.message || "Unable to update project.",
            });
        }
    }
);

/* =========================
   PROJECTS - DELETE
========================= */
app.delete("/api/projects/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const existingResult = await pool.query(
            "SELECT title, image_url FROM projects WHERE id = $1 LIMIT 1",
            [id]
        );

        if (existingResult.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        const project = existingResult.rows[0];

        await pool.query(
            "DELETE FROM projects WHERE id = $1",
            [id]
        );

        if (project.image_url) {
            await deleteProjectImage(project.image_url);
        }

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            [`Deleted project #${id}: ${project.title}`]
        );

        res.json({
            success: true,
            message: "Project deleted successfully.",
        });
    } catch (error) {
        console.error("Project delete error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete project.",
        });
    }
});

/* =========================
   CERTIFICATES - READ
========================= */
app.get("/api/certificates", authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, title, issuer, date, link, created_at FROM certificates ORDER BY date DESC, created_at DESC"
        );
        res.json({ success: true, certificates: result.rows });
    } catch (error) {
        console.error("Certificates fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch certificates.",
        });
    }
});

/* =========================
   CERTIFICATES - CREATE
========================= */
app.post("/api/certificates", authenticateAdmin, async (req, res) => {
    try {
        const { title, issuer, date, link } = req.body;

        if (!title?.trim() || !issuer?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title and issuer are required.",
            });
        }

        const result = await pool.query(
            `INSERT INTO certificates (title, issuer, date, link)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [
                title.trim(),
                issuer.trim(),
                date || null,
                link?.trim() || null,
            ]
        );

        const certificateId = result.rows[0].id;

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            [`Created certificate #${certificateId}: ${title.trim()}`]
        );

        res.status(201).json({
            success: true,
            message: "Certificate created successfully.",
            certificateId,
        });
    } catch (error) {
        console.error("Certificate create error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to create certificate.",
        });
    }
});

/* =========================
   CERTIFICATES - UPDATE
========================= */
app.put("/api/certificates/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, issuer, date, link } = req.body;

        if (!title?.trim() || !issuer?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title and issuer are required.",
            });
        }

        const result = await pool.query(
            `UPDATE certificates
             SET title = $1, issuer = $2, date = $3, link = $4
             WHERE id = $5
             RETURNING id`,
            [
                title.trim(),
                issuer.trim(),
                date || null,
                link?.trim() || null,
                id,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found.",
            });
        }

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            [`Updated certificate #${id}: ${title.trim()}`]
        );

        res.json({
            success: true,
            message: "Certificate updated successfully.",
        });
    } catch (error) {
        console.error("Certificate update error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to update certificate.",
        });
    }
});

/* =========================
   CERTIFICATES - DELETE
========================= */
app.delete("/api/certificates/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const existingResult = await pool.query(
            "SELECT title FROM certificates WHERE id = $1 LIMIT 1",
            [id]
        );

        if (existingResult.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found.",
            });
        }

        await pool.query(
            "DELETE FROM certificates WHERE id = $1",
            [id]
        );

        await pool.query(
            "INSERT INTO admin_activity (activity) VALUES ($1)",
            [`Deleted certificate #${id}: ${existingResult.rows[0].title}`]
        );

        res.json({
            success: true,
            message: "Certificate deleted successfully.",
        });
    } catch (error) {
        console.error("Certificate delete error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete certificate.",
        });
    }
});

/* =========================
   ADMIN ACTIVITY
========================= */
app.get("/api/admin/activity", authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, activity, created_at FROM admin_activity ORDER BY created_at DESC LIMIT 50"
        );
        res.json({ success: true, activity: result.rows });
    } catch (error) {
        console.error("Admin activity error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to fetch admin activity.",
        });
    }
});

/* =========================
   ERROR HANDLER
========================= */
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Image must be 20MB or smaller.",
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    if (error?.message?.includes("Only JPG")) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    console.error("Unhandled server error:", error);
    res.status(500).json({
        success: false,
        message: "An unexpected server error occurred.",
    });
});

/* =========================
   START SERVER
========================= */
const server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await pool.query("SELECT 1");
        console.log("Supabase PostgreSQL database connected.");
    } catch (error) {
        console.error("PostgreSQL database connection failed:", error.message);
    }
});

async function shutdown(signal) {
    console.log(`${signal} received. Shutting down...`);
    server.close(async () => {
        await pool.end();
        process.exit(0);
    });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
