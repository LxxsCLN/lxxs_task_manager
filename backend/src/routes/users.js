import { Router } from "express";
import db from "../../db.js";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
