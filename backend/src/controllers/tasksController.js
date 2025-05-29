import db from "../../db.js";
import { completeTaskSchema, taskSchema } from "../schemas/tasks.js";
import { getTaskById } from "../services/services.js";

export const getTask = async (req, res) => {
    const { id } = req.params;
    const { id: user_id, role } = req.user;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    try {
        if (role === "admin") {
            const task = await getTaskById(id);
            res.json(task);
        } else {
            const result = await db.query(
                "SELECT t.*, u.name FROM tasks t INNER JOIN users u ON t.user_id = u.id WHERE t.id = $1 AND t.user_id = $2",
                [id, user_id]
            );
            res.json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTasks = async (req, res) => {
    const { id, role } = req.user;
    const { search, status, priority, user_id } = req.query;

    let sqlQuery = `SELECT t.*, u.name FROM tasks t INNER JOIN users u ON t.user_id = u.id`;
    const conditions = [];
    const values = [];
    let index = 1;

    if (role === "user") {
        conditions.push(`t.user_id = $${index++}`);
        values.push(id);
    }

    if (search && search !== "") {
        conditions.push(
            `(LOWER(t.title) LIKE LOWER($${index}) OR LOWER(t.description) LIKE LOWER($${index}))`
        );
        values.push(`%${search}%`);
        index++;
    }

    if (status && status !== "all") {
        conditions.push(`t.status = $${index++}`);
        values.push(status);
    }

    if (priority && priority !== "all") {
        conditions.push(`t.priority = $${index++}`);
        values.push(priority);
    }

    if (user_id && user_id !== "all" && role !== "user") {
        conditions.push(`t.user_id = $${index++}`);
        values.push(user_id);
    }

    if (conditions.length > 0) {
        sqlQuery += ` WHERE ` + conditions.join(" AND ");
    }

    sqlQuery += ` ORDER BY t.id DESC;`;

    try {
        const result = await db.query(sqlQuery, values);
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
    const { title, description, status, user_id, priority } = parsed.data;

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

        const task = await getTaskById(id);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    const { id: currentUserId, role } = req.user;

    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { id, title, description, status, user_id, priority, notes } =
        parsed.data;

    if (role === "user" && currentUserId !== user_id)
        return res
            .status(403)
            .json({ error: "You are not allowed to update this task" });

    let sqlQuery =
        "UPDATE tasks SET title = $2, description = $3, status = $4, user_id = $5, priority = $6 ";
    let values = [id, title, description, status, user_id, priority];

    if (role === "user") {
        sqlQuery = "UPDATE tasks SET status = $2, notes = $3 ";
        values = [id, status, notes];
    }

    if (status === "completed") {
        sqlQuery += ", completed_at = NOW() ";
    }

    sqlQuery += ` WHERE id = $1 RETURNING id`;

    try {
        const result = await db.query(sqlQuery, values);

        const newId = result.rows[0].id;

        const task = await getTaskById(newId);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const completeTask = async (req, res) => {
    const parsed = completeTaskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { id, notes } = parsed.data;
    const { id: user_id } = req.user;

    try {
        const result = await db.query(
            "UPDATE tasks SET status = 'completed', notes = $1 WHERE id = $2 AND user_id = $3 RETURNING id",
            [notes, id, user_id]
        );

        const task = await getTaskById(result.rows[0].id);
        res.json(task);
    } catch (err) {
        console.log(" completeTask err: ", err);
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
