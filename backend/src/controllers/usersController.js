import db from "../../db.js";
import { roleSchema } from "../schemas/users.js";

export const getAllUsers = async (req, res) => {
    const parsed = roleSchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { role } = parsed.data;

    let sqlQuery = `SELECT id, name, role FROM users`;
    const values = [];

    if (role) {
        sqlQuery += ` WHERE role = $1`;
        values.push(role);
    }

    try {
        const result = await db.query(sqlQuery, values);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
