const express = require("express");
const router = express.Router();
const db = require("../models/db.js");

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
