import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";

const service = new TaskService();

export class TaskController {
  create = async (req: AuthRequest, res: Response) => {
    res.json(
      await service.create({
        ...req.body,
        userId: req.userId
      })
    );
  };

  getAll = async (req: AuthRequest, res: Response) => {
    res.json(await service.getAll(req.userId!));
  };

  update = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    res.json(
      await service.update(id, req.body)
    );
  };

  delete = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await service.delete(id);

    res.json({ message: "Deleted" });
  };
}
