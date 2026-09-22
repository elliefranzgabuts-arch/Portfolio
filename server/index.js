import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://elliefranzgabuts-arch.github.io",
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(new URL("./ca.pem", import.meta.url)),
        rejectUnauthorized: true,
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio backend is running.",
    });
});

app.post("/api/visitors", async (req, res) => {
    try {
        const { visitorId } = req.body;

        if (!visitorId || typeof visitorId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid visitor ID.",
            });
        }

        await pool.execute(
            `
            INSERT IGNORE INTO visitors (visitor_id)
            VALUES (?)
            `,
            [visitorId]
        );

        const [rows] = await pool.execute(
            `
            SELECT COUNT(*) AS totalVisitors
            FROM visitors
            `
        );

        return res.json({
            success: true,
            totalVisitors: Number(rows[0].totalVisitors),
        });
    } catch (error) {
        console.error("Visitor error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to record visitor.",
        });
    }
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        await pool.execute(
            `
            INSERT INTO contact_messages (name, email, message)
            VALUES (?, ?, ?)
            `,
            [name.trim(), email.trim(), message.trim()]
        );

        return res.json({
            success: true,
            message: "Message sent successfully.",
        });
    } catch (error) {
        console.error("Contact error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send message.",
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required.",
            });
        }

        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminPasswordHash) {
            console.error("ADMIN_PASSWORD_HASH is not configured.");

            return res.status(500).json({
                success: false,
                message: "Admin authentication is not configured.",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            adminPasswordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign(
            {
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        return res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Login failed.",
        });
    }
});

function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied.",
            });
        }

        req.admin = decoded;

        next();
    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
}

app.get("/api/analytics", authenticateAdmin, async (req, res) => {
    try {
        const [visitorRows] = await pool.execute(
            `
            SELECT COUNT(*) AS totalVisitors
            FROM visitors
            `
        );

        const [messageRows] = await pool.execute(
            `
            SELECT COUNT(*) AS totalMessages
            FROM contact_messages
            `
        );

        const [latestMessages] = await pool.execute(
            `
            SELECT
                id,
                name,
                email,
                message,
                created_at
            FROM contact_messages
            ORDER BY created_at DESC
            LIMIT 10
            `
        );

        return res.json({
            success: true,
            totalVisitors: Number(visitorRows[0].totalVisitors),
            totalMessages: Number(messageRows[0].totalMessages),
            latestMessages,
        });
    } catch (error) {
        console.error("Analytics error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to load analytics.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
