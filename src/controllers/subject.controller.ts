import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { SubjectService } from "../services/subject.service";

const service = new SubjectService();

export class SubjectController {
  create = async (req: AuthRequest, res: Response) => {
    const subject = await service.create(
      req.body.name,
      req.userId!
    );

    res.json(subject);
  };

  getAll = async (req: AuthRequest, res: Response) => {
    res.json(await service.getAll(req.userId!));
  };

  delete = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await service.delete(id);

    res.json({ message: "Deleted" });
  };
}
