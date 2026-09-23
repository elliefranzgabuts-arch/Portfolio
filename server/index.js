import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// CORS
// =========================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://elliefranzgabuts-arch.github.io",
            "https://portfolio.elliefranzgabuts.workers.dev",
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// =========================
// Middleware
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Login Rate Limiter
// =========================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later.",
    },
});

// =========================
// Database Connection
// =========================

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(new URL("./ca.pem", import.meta.url)),
    },
});

// =========================
// JWT Authentication
// =========================

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid authentication format.",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token.",
            });
        }

        req.user = user;
        next();
    });
}

// =========================
// Health Check
// =========================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio backend is running.",
    });
});

// =========================
// Visitor Tracking
// =========================

app.post("/api/visitors", async (req, res) => {
    try {
        const { visitorId } = req.body;

        if (!visitorId) {
            return res.status(400).json({
                success: false,
                message: "Visitor ID is required.",
            });
        }

        await db.execute(
            `
            INSERT IGNORE INTO unique_visitors (visitor_id)
            VALUES (?)
            `,
            [visitorId]
        );

        const [rows] = await db.execute(
            `
            SELECT COUNT(*) AS totalVisitors
            FROM unique_visitors
            `
        );

        res.json({
            success: true,
            totalVisitors: rows[0].totalVisitors,
        });
    } catch (error) {
        console.error("Visitor tracking error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to track visitor.",
        });
    }
});

// =========================
// Contact Form
// =========================

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        await db.execute(
            `
            INSERT INTO contact_messages
            (name, email, message)
            VALUES (?, ?, ?)
            `,
            [name, email, message]
        );

        res.json({
            success: true,
            message: "Message sent successfully.",
        });
    } catch (error) {
        console.error("Contact form error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message.",
        });
    }
});

// =========================
// Admin Login
// =========================

app.post("/api/login", loginLimiter, async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required.",
        });
    }

    try {
        /*
         * ADMIN_PASSWORD is the password stored
         * in your Render environment variables.
         */
        const isValidPassword =
            password === process.env.ADMIN_PASSWORD;

        if (!isValidPassword) {
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

        res.json({
            success: true,
            message: "Login successful.",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed.",
        });
    }
});

// =========================
// Analytics
// =========================

app.get("/api/analytics", authenticateToken, async (req, res) => {
    try {
        const [visitorRows] = await db.execute(
            `
            SELECT COUNT(*) AS totalVisitors
            FROM unique_visitors
            `
        );

        const [messageRows] = await db.execute(
            `
            SELECT COUNT(*) AS totalMessages
            FROM contact_messages
            `
        );

        const [latestMessages] = await db.execute(
            `
            SELECT
                name,
                email,
                message,
                created_at
            FROM contact_messages
            ORDER BY created_at DESC
            LIMIT 10
            `
        );

        res.json({
            success: true,
            totalVisitors: visitorRows[0].totalVisitors,
            totalMessages: messageRows[0].totalMessages,
            latestMessages,
        });
    } catch (error) {
        console.error("Analytics error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load analytics.",
        });
    }
});

// =========================
// Start Server
// =========================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
