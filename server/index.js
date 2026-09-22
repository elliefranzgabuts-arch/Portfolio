const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
