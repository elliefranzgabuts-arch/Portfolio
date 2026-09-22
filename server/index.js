
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
    })
);

app.use(express.json());

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

const visitorLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many visitor requests. Please try again later.",
    },
});

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: {
        ca: fs.readFileSync("./ca.pem"),
    },
});

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

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running!",
    });
});

app.post("/api/visitors", visitorLimiter, async (req, res) => {
    try {
        const { visitorId } = req.body;

        if (
            typeof visitorId !== "string" ||
            !visitorId.trim() ||
            visitorId.trim().length > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid visitor ID.",
            });
        }

        await db.execute(
            `
            INSERT IGNORE INTO unique_visitors (visitor_id)
            VALUES (?)
            `,
            [visitorId.trim()]
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

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid input.",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanMessage = message.trim();

        if (!cleanName || !cleanEmail || !cleanMessage) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (cleanName.length < 2 || cleanName.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Name must be between 2 and 100 characters.",
            });
        }

        if (cleanEmail.length > 150) {
            return res.status(400).json({
                success: false,
                message: "Email is too long.",
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        if (cleanMessage.length < 2 || cleanMessage.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Message must be between 2 and 2000 characters.",
            });
        }

        await db.execute(
            `
            INSERT INTO contact_messages
            (name, email, message)
            VALUES (?, ?, ?)
            `,
            [cleanName, cleanEmail, cleanMessage]
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

app.post("/api/login", loginLimiter, (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required.",
        });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
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
});

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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

