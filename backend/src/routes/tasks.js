import { Router } from "express";

import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
} from "../controllers/tasksController.js";

const router = Router();

router.get("/all", getAllTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
