const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Database
const db = new Database("reuse-radar.db");

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Create items table
db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT DEFAULT 'available'
    )
`);

// Get all items
app.get("/api/items", (req, res) => {
    const items = db
        .prepare("SELECT * FROM items ORDER BY id DESC")
        .all();

    res.json(items);
});

// Add new item
app.post("/api/items", (req, res) => {
    const {
        name,
        category,
        description,
        location
    } = req.body;

    if (!name || !category || !description || !location) {
        return res.status(400).json({
            error: "Please fill all fields"
        });
    }

    const result = db.prepare(`
        INSERT INTO items
        (name, category, description, location)
        VALUES (?, ?, ?, ?)
    `).run(
        name,
        category,
        description,
        location
    );

    res.json({
        message: "Item added successfully!",
        id: result.lastInsertRowid
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Reuse Radar server running at http://localhost:${PORT}`);
});