import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { SubjectController } from "../controllers/subject.controller";

const router = Router();
const controller = new SubjectController();

router.post("/", authMiddleware, controller.create);
router.get("/", authMiddleware, controller.getAll);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
