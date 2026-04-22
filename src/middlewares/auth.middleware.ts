import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Bypass authentication for frontend testing
  // Hardcode a valid MongoDB ObjectId as a dummy user
  req.userId = "65abcdef1234567890abcdef";
  next();
};
