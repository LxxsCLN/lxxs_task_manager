import { Router } from "express";

import {
    createTask,
    getAllTasks,
    getTask,
} from "../controllers/tasksController.js";

const router = Router();

router.get("/all", getAllTasks);

router.get("/:id", getTask);

router.post("/", createTask);

export default router;
