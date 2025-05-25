import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import db from "../../db.js";
import { loginSchema, signupSchema } from "../schemas/auth.js";
const { sign } = jsonwebtoken;

export const register = async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { name, username, password, role } = parsed.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            "INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, username, role",
            [name, username, hashedPassword, role || "user"]
        );
        const user = result.rows[0];

        const token = sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(400).json({ error: err.message, code: err.code });
    }
};

export const login = async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { username, password } = parsed.data;

    try {
        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid password" });

        const token = sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
