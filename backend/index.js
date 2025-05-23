import cors from "cors";
import express from "express";

import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/tasks.js";
import userRoutes from "./src/routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
