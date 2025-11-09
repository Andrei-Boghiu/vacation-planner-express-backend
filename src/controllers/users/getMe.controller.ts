import type { Request, Response } from "express";

export default async function getMeController(req: Request, res: Response) {
  const userData = req.user;

  return res.status(200).json(userData);
}
