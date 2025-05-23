import { Router } from "express";
import db from "../../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
