import { Router } from "express";
import {
    completeTask,
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
} from "../controllers/tasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/all", authMiddleware, getAllTasks);

router.get("/:id", authMiddleware, getTask);

router.post("/", authMiddleware, roleMiddleware("admin"), createTask);

router.put("/", authMiddleware, roleMiddleware("admin"), updateTask);

router.put("/complete", authMiddleware, completeTask);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTask);

export default router;
