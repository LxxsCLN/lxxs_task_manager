import db from "../../db.js";

export const getTaskById = async (id) => {
    try {
        const result = await db.query(
            "SELECT t.*, u.name FROM tasks t INNER JOIN users u ON t.user_id = u.id WHERE t.id = $1",
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error("Error fetching task by ID:", err);
        throw err;
    }
};
