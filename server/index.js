import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDirectory = path.join(
    __dirname,
    "uploads",
    "projects"
);

fs.mkdirSync(uploadsDirectory, {
    recursive: true,
});

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://elliefranzgabuts-arch.github.io",
    "https://your-netlify-site.netlify.app",
];

app.use(
    cors({
        origin(origin, callback) {
            if (
                !origin ||
                allowedOrigins.includes(origin)
            ) {
                callback(null, true);
            } else {
                callback(
                    new Error(
                        "Not allowed by CORS"
                    )
                );
            }
        },
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(
        process.env.DB_PORT || 3306
    ),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:
        process.env.DB_NAME ||
        "personal_website",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false,
    },
});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDirectory);
    },

    filename(req, file, cb) {
        const extension =
            path.extname(
                file.originalname
            ).toLowerCase();

        const baseName = path
            .basename(
                file.originalname,
                extension
            )
            .replace(
                /[^a-zA-Z0-9-_]/g,
                "-"
            )
            .replace(/-+/g, "-")
            .toLowerCase();

        const uniqueName = `${Date.now()}-${baseName}${extension}`;

        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,

    limits: {
        fileSize:
            20 * 1024 * 1024,
    },

    fileFilter(req, file, cb) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];

        if (
            allowedTypes.includes(
                file.mimetype
            )
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only JPG, JPEG, PNG, and WEBP images are allowed."
                )
            );
        }
    },
});

function authenticateAdmin(
    req,
    res,
    next
) {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message:
                "Authentication required.",
        });
    }

    const token =
        authHeader.startsWith(
            "Bearer "
        )
            ? authHeader.split(" ")[1]
            : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message:
                "Invalid authentication token.",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.admin = decoded;

        next();
    } catch {
        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired token.",
        });
    }
}

function deleteProjectImage(
    imageUrl
) {
    if (!imageUrl) {
        return;
    }

    const fileName =
        path.basename(imageUrl);

    const filePath = path.join(
        uploadsDirectory,
        fileName
    );

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

app.get("/", (req, res) => {
    res.json({
        success: true,
        message:
            "Backend is running!",
    });
});

app.get(
    "/api/health",
    async (req, res) => {
        try {
            const connection =
                await pool.getConnection();

            await connection.ping();

            connection.release();

            res.json({
                success: true,
                message:
                    "Backend and database are connected.",
            });
        } catch (error) {
            console.error(
                "Health check error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Backend is running but database connection failed.",
            });
        }
    }
);

app.post(
    "/api/login",
    async (req, res) => {
        try {
            const { password } =
                req.body;

            if (!password) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Password is required.",
                    });
            }

            const adminPassword =
                process.env
                    .ADMIN_PASSWORD;

            if (!adminPassword) {
                return res
                    .status(500)
                    .json({
                        success: false,
                        message:
                            "Admin password is not configured.",
                    });
            }

            let passwordMatches =
                false;

            if (
                adminPassword.startsWith(
                    "$2a$"
                ) ||
                adminPassword.startsWith(
                    "$2b$"
                ) ||
                adminPassword.startsWith(
                    "$2y$"
                )
            ) {
                passwordMatches =
                    await bcrypt.compare(
                        password,
                        adminPassword
                    );
            } else {
                passwordMatches =
                    password ===
                    adminPassword;
            }

            if (!passwordMatches) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Invalid password.",
                    });
            }

            const token =
                jwt.sign(
                    {
                        role: "admin",
                    },
                    JWT_SECRET,
                    {
                        expiresIn:
                            "2h",
                    }
                );

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                ["Admin logged in"]
            );

            res.json({
                success: true,
                token,
            });
        } catch (error) {
            console.error(
                "Login error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Login failed.",
            });
        }
    }
);

app.get(
    "/api/admin/check",
    authenticateAdmin,
    (req, res) => {
        res.json({
            success: true,
            authenticated: true,
        });
    }
);

app.post(
    "/api/visitors",
    async (req, res) => {
        try {
            const {
                visitorId,
                path: visitorPath,
            } = req.body;

            if (!visitorId) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Visitor ID is required.",
                    });
            }

            const safePath =
                visitorPath || "/";

            await pool.execute(
                "INSERT INTO visitors (visitor_id, path) VALUES (?, ?)",
                [
                    visitorId,
                    safePath,
                ]
            );

            const [
                existingVisitor,
            ] = await pool.execute(
                "SELECT id FROM unique_visitors WHERE visitor_id = ? LIMIT 1",
                [visitorId]
            );

            if (
                existingVisitor.length ===
                0
            ) {
                await pool.execute(
                    "INSERT INTO unique_visitors (visitor_id) VALUES (?)",
                    [visitorId]
                );

                await pool.execute(
                    "UPDATE site_stats SET visitor_count = visitor_count + 1 WHERE id = 1"
                );
            }

            const [stats] =
                await pool.execute(
                    "SELECT visitor_count FROM site_stats WHERE id = 1"
                );

            const [totalVisitRows] =
                await pool.execute(
                    "SELECT COUNT(*) AS total FROM visitors"
                );

            res.json({
                success: true,
                visitorCount:
                    stats[0]
                        ?.visitor_count ||
                    0,
                totalVisits:
                    totalVisitRows[0]
                        ?.total || 0,
            });
        } catch (error) {
            console.error(
                "Visitor tracking error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to record visitor.",
            });
        }
    }
);

app.get(
    "/api/analytics",
    authenticateAdmin,
    async (req, res) => {
        try {
            const [
                visitorStatsRows,
            ] = await pool.execute(
                "SELECT visitor_count FROM site_stats WHERE id = 1"
            );

            const [
                visitStatsRows,
            ] = await pool.execute(
                "SELECT COUNT(*) AS totalVisits FROM visitors"
            );

            const [
                messageStatsRows,
            ] = await pool.execute(
                "SELECT COUNT(*) AS totalMessages FROM contact_messages"
            );

            const [
                projectStatsRows,
            ] = await pool.execute(
                "SELECT COUNT(*) AS totalProjects FROM projects"
            );

            const [
                certificateStatsRows,
            ] = await pool.execute(
                "SELECT COUNT(*) AS totalCertificates FROM certificates"
            );

            const [
                recentVisitors,
            ] = await pool.execute(
                "SELECT id, visitor_id, path, visited_at FROM visitors ORDER BY visited_at DESC LIMIT 20"
            );

            const [
                recentMessages,
            ] = await pool.execute(
                "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 10"
            );

            res.json({
                success: true,
                analytics: {
                    uniqueVisitors:
                        visitorStatsRows[0]
                            ?.visitor_count ||
                        0,

                    totalVisits:
                        visitStatsRows[0]
                            ?.totalVisits ||
                        0,

                    totalMessages:
                        messageStatsRows[0]
                            ?.totalMessages ||
                        0,

                    totalProjects:
                        projectStatsRows[0]
                            ?.totalProjects ||
                        0,

                    totalCertificates:
                        certificateStatsRows[0]
                            ?.totalCertificates ||
                        0,

                    recentVisitors,
                    recentMessages,
                },
            });
        } catch (error) {
            console.error(
                "Analytics error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to fetch analytics.",
            });
        }
    }
);

app.post(
    "/api/contact",
    async (req, res) => {
        try {
            const {
                name,
                email,
                message,
            } = req.body;

            if (
                !name?.trim() ||
                !email?.trim() ||
                !message?.trim()
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Name, email, and message are required.",
                    });
            }

            await pool.execute(
                "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
                [
                    name.trim(),
                    email.trim(),
                    message.trim(),
                ]
            );

            res.json({
                success: true,
                message:
                    "Message sent successfully.",
            });
        } catch (error) {
            console.error(
                "Contact error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to send message.",
            });
        }
    }
);

app.get(
    "/api/contact",
    authenticateAdmin,
    async (req, res) => {
        try {
            const [messages] =
                await pool.execute(
                    "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC"
                );

            res.json({
                success: true,
                messages,
            });
        } catch (error) {
            console.error(
                "Contact fetch error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to fetch messages.",
            });
        }
    }
);

app.delete(
    "/api/contact/:id",
    authenticateAdmin,
    async (req, res) => {
        try {
            const { id } =
                req.params;

            await pool.execute(
                "DELETE FROM contact_messages WHERE id = ?",
                [id]
            );

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Deleted contact message #${id}`,
                ]
            );

            res.json({
                success: true,
                message:
                    "Message deleted successfully.",
            });
        } catch (error) {
            console.error(
                "Contact delete error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to delete message.",
            });
        }
    }
);

app.get(
    "/api/projects",
    async (req, res) => {
        try {
            const [projects] =
                await pool.execute(
                    "SELECT id, title, description, link, image_url, created_at FROM projects ORDER BY created_at DESC"
                );

            res.json({
                success: true,
                projects,
            });
        } catch (error) {
            console.error(
                "Projects fetch error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to fetch projects.",
            });
        }
    }
);

app.post(
    "/api/projects",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                title,
                description,
                link,
            } = req.body;

            if (
                !title?.trim() ||
                !description?.trim()
            ) {
                if (req.file) {
                    fs.unlinkSync(
                        req.file.path
                    );
                }

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Title and description are required.",
                    });
            }

            const imageUrl =
                req.file
                    ? `/uploads/projects/${req.file.filename}`
                    : null;

            const [result] =
                await pool.execute(
                    "INSERT INTO projects (title, description, link, image_url) VALUES (?, ?, ?, ?)",
                    [
                        title.trim(),
                        description.trim(),
                        link?.trim() ||
                            null,
                        imageUrl,
                    ]
                );

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Created project #${result.insertId}: ${title.trim()}`,
                ]
            );

            res.status(201).json({
                success: true,
                message:
                    "Project created successfully.",
                projectId:
                    result.insertId,
                imageUrl,
            });
        } catch (error) {
            if (req.file) {
                try {
                    fs.unlinkSync(
                        req.file.path
                    );
                } catch {}
            }

            console.error(
                "Project create error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Unable to create project.",
            });
        }
    }
);

app.put(
    "/api/projects/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { id } =
                req.params;

            const {
                title,
                description,
                link,
            } = req.body;

            if (
                !title?.trim() ||
                !description?.trim()
            ) {
                if (req.file) {
                    fs.unlinkSync(
                        req.file.path
                    );
                }

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Title and description are required.",
                    });
            }

            const [
                existingRows,
            ] = await pool.execute(
                "SELECT image_url FROM projects WHERE id = ? LIMIT 1",
                [id]
            );

            if (
                existingRows.length ===
                0
            ) {
                if (req.file) {
                    fs.unlinkSync(
                        req.file.path
                    );
                }

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Project not found.",
                    });
            }

            const oldImageUrl =
                existingRows[0]
                    .image_url;

            let imageUrl =
                oldImageUrl;

            if (req.file) {
                imageUrl = `/uploads/projects/${req.file.filename}`;
            }

            await pool.execute(
                "UPDATE projects SET title = ?, description = ?, link = ?, image_url = ? WHERE id = ?",
                [
                    title.trim(),
                    description.trim(),
                    link?.trim() ||
                        null,
                    imageUrl,
                    id,
                ]
            );

            if (
                req.file &&
                oldImageUrl
            ) {
                deleteProjectImage(
                    oldImageUrl
                );
            }

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Updated project #${id}: ${title.trim()}`,
                ]
            );

            res.json({
                success: true,
                message:
                    "Project updated successfully.",
                imageUrl,
            });
        } catch (error) {
            if (req.file) {
                try {
                    fs.unlinkSync(
                        req.file.path
                    );
                } catch {}
            }

            console.error(
                "Project update error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Unable to update project.",
            });
        }
    }
);

app.delete(
    "/api/projects/:id",
    authenticateAdmin,
    async (req, res) => {
        try {
            const { id } =
                req.params;

            const [
                existingRows,
            ] = await pool.execute(
                "SELECT title, image_url FROM projects WHERE id = ? LIMIT 1",
                [id]
            );

            if (
                existingRows.length ===
                0
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Project not found.",
                    });
            }

            const project =
                existingRows[0];

            await pool.execute(
                "DELETE FROM projects WHERE id = ?",
                [id]
            );

            if (project.image_url) {
                deleteProjectImage(
                    project.image_url
                );
            }

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Deleted project #${id}: ${project.title}`,
                ]
            );

            res.json({
                success: true,
                message:
                    "Project deleted successfully.",
            });
        } catch (error) {
            console.error(
                "Project delete error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to delete project.",
            });
        }
    }
);

app.get(
    "/api/certificates",
    authenticateAdmin,
    async (req, res) => {
        try {
            const [
                certificates,
            ] = await pool.execute(
                "SELECT id, title, issuer, date, link, created_at FROM certificates ORDER BY date DESC, created_at DESC"
            );

            res.json({
                success: true,
                certificates,
            });
        } catch (error) {
            console.error(
                "Certificates fetch error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to fetch certificates.",
            });
        }
    }
);

app.post(
    "/api/certificates",
    authenticateAdmin,
    async (req, res) => {
        try {
            const {
                title,
                issuer,
                date,
                link,
            } = req.body;

            if (
                !title?.trim() ||
                !issuer?.trim()
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Title and issuer are required.",
                    });
            }

            const [result] =
                await pool.execute(
                    "INSERT INTO certificates (title, issuer, date, link) VALUES (?, ?, ?, ?)",
                    [
                        title.trim(),
                        issuer.trim(),
                        date || null,
                        link?.trim() ||
                            null,
                    ]
                );

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Created certificate #${result.insertId}: ${title.trim()}`,
                ]
            );

            res.status(201).json({
                success: true,
                message:
                    "Certificate created successfully.",
                certificateId:
                    result.insertId,
            });
        } catch (error) {
            console.error(
                "Certificate create error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to create certificate.",
            });
        }
    }
);

app.put(
    "/api/certificates/:id",
    authenticateAdmin,
    async (req, res) => {
        try {
            const { id } =
                req.params;

            const {
                title,
                issuer,
                date,
                link,
            } = req.body;

            if (
                !title?.trim() ||
                !issuer?.trim()
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Title and issuer are required.",
                    });
            }

            const [result] =
                await pool.execute(
                    "UPDATE certificates SET title = ?, issuer = ?, date = ?, link = ? WHERE id = ?",
                    [
                        title.trim(),
                        issuer.trim(),
                        date || null,
                        link?.trim() ||
                            null,
                        id,
                    ]
                );

            if (
                result.affectedRows ===
                0
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Certificate not found.",
                    });
            }

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Updated certificate #${id}: ${title.trim()}`,
                ]
            );

            res.json({
                success: true,
                message:
                    "Certificate updated successfully.",
            });
        } catch (error) {
            console.error(
                "Certificate update error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to update certificate.",
            });
        }
    }
);

app.delete(
    "/api/certificates/:id",
    authenticateAdmin,
    async (req, res) => {
        try {
            const { id } =
                req.params;

            const [
                existingRows,
            ] = await pool.execute(
                "SELECT title FROM certificates WHERE id = ? LIMIT 1",
                [id]
            );

            if (
                existingRows.length ===
                0
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Certificate not found.",
                    });
            }

            await pool.execute(
                "DELETE FROM certificates WHERE id = ?",
                [id]
            );

            await pool.execute(
                "INSERT INTO admin_activity (activity) VALUES (?)",
                [
                    `Deleted certificate #${id}: ${existingRows[0].title}`,
                ]
            );

            res.json({
                success: true,
                message:
                    "Certificate deleted successfully.",
            });
        } catch (error) {
            console.error(
                "Certificate delete error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to delete certificate.",
            });
        }
    }
);

app.get(
    "/api/admin/activity",
    authenticateAdmin,
    async (req, res) => {
        try {
            const [activity] =
                await pool.execute(
                    "SELECT id, activity, created_at FROM admin_activity ORDER BY created_at DESC LIMIT 50"
                );

            res.json({
                success: true,
                activity,
            });
        } catch (error) {
            console.error(
                "Admin activity error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to fetch admin activity.",
            });
        }
    }
);

app.use(
    (
        error,
        req,
        res,
        next
    ) => {
        if (
            error instanceof
            multer.MulterError
        ) {
            if (
                error.code ===
                "LIMIT_FILE_SIZE"
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Image must be 20MB or smaller.",
                    });
            }

            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        error.message,
                });
        }

        if (
            error?.message?.includes(
                "Only JPG"
            )
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        error.message,
                });
        }

        console.error(
            "Unhandled server error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "An unexpected server error occurred.",
        });
    }
);

app.listen(
    PORT,
    async () => {
        console.log(
            `Server running on port ${PORT}`
        );

        try {
            const connection =
                await pool.getConnection();

            await connection.ping();

            connection.release();

            console.log(
                "MySQL database connected."
            );
        } catch (error) {
            console.error(
                "MySQL database connection failed:",
                error.message
            );
        }
    }
);
