import { Router } from "express";
import db from "../../db.js";
const router = Router();

router.get("/all", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/all/users", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM users WHERE role = 'user'"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
