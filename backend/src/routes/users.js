import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/all", authMiddleware, roleMiddleware("admin"), getAllUsers);

export default router;
