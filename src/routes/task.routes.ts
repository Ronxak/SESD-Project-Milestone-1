import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const controller = new TaskController();

router.post("/", authMiddleware, controller.create);
router.get("/", authMiddleware, controller.getAll);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
