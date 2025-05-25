import { Router } from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
} from "../controllers/tasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/all", authMiddleware, getAllTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
