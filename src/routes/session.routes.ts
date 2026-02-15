import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { SessionController } from "../controllers/session.controller";

const router = Router();
const controller = new SessionController();

router.post("/start", authMiddleware, controller.start);
router.get("/", authMiddleware, controller.getAll);
router.put("/:id/end", authMiddleware, controller.end);

export default router;
