import db from "../../db.js";
import { taskSchema } from "../schemas/tasks.js";

export const getTask = async (req, res) => {
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
};

export const getAllTasks = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT t.*, u.name FROM tasks t INNER JOIN users u ON t.user_id = u.id"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTask = async (req, res) => {
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
            "INSERT INTO tasks (title, description, status, user_id, priority) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [title, description, status, user_id, priority]
        );

        const id = result.rows[0].id;

        res.json({ id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { id } = req.params;
    const { title, description, status, user_id, priority } = parsed.data;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const result = await db.query(
            "UPDATE tasks SET title = $1, description = $2, status = $3, user_id = $4, priority = $5 WHERE id = $6 RETURNING *",
            [title, description, status, user_id, priority, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        await db.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
