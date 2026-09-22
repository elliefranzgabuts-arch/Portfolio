const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running!",
    });
});

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields.",
        });
    }

    try {
        await db.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );

        res.json({
            success: true,
            message: "Contact message saved!",
        });
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save contact message.",
        });
    }
});

app.post("/api/visitors", async (req, res) => {
    const { visitorId } = req.body;

    if (!visitorId) {
        return res.status(400).json({
            success: false,
            message: "Visitor ID is required.",
        });
    }

    try {
        await db.execute(
            "INSERT IGNORE INTO unique_visitors (visitor_id) VALUES (?)",
            [visitorId]
        );

        const [rows] = await db.execute(
            "SELECT COUNT(*) AS visitorCount FROM unique_visitors"
        );

        res.json({
            success: true,
            visitorCount: rows[0].visitorCount,
        });
    } catch (error) {
        console.error("Visitor counter error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update visitor count.",
        });
    }
});

app.post("/api/login", (req, res) => {
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
            "SELECT COUNT(*) AS totalVisitors FROM unique_visitors"
        );

        const [messageRows] = await db.execute(
            "SELECT COUNT(*) AS totalMessages FROM contact_messages"
        );

        const [latestMessages] = await db.execute(
            "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5"
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
