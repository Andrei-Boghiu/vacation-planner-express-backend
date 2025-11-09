import { Request, Response } from "express";

export default function fallbackHandler(_req: Request, res: Response): Response {
  return res.status(404).json({
    error: "404 Not Found",
    message: "Route does not exist",
  });
}
