import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { SessionService } from "../services/session.service";

const service = new SessionService();

export class SessionController {
  start = async (req: AuthRequest, res: Response) => {
    res.json(
      await service.start(
        req.userId!,
        req.body.subjectId
      )
    );
  };

  getAll = async (req: AuthRequest, res: Response) => {
    res.json(await service.getAll(req.userId!));
  };

  end = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const session = await service.end(id);
      res.json(session);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  };
}
