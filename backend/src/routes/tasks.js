import { Router } from "express";
import db from "../../db.js";

import { taskSchema } from "../schemas/tasks.js";

const router = Router();

router.get("/all", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT t.*, u.name FROM tasks t INNER JOIN users u ON t.user_id = u.id"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    try {
        const result = await db.query("SELECT * FROM tasks WHERE id = $1", [
            id,
        ]);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const {
        title,
        description,
        taskStatus: status,
        user_id,
        priority,
    } = parsed.data;

    if (!title || !user_id) {
        return res
            .status(400)
            .json({ error: "Title and user ID are required" });
    }

    try {
        const result = await db.query(
            "INSERT INTO tasks (title, description, status, user_id, priority) VALUES ($1, $2, $3, $4, $5) RETURNING title, description, status, priority",
            [title, description, status, user_id, priority]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
