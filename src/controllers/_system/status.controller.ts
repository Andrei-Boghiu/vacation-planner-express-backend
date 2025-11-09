import type { Request, Response } from "express";

export default function statusController(_req: Request, res: Response) {
  return res.status(200).json({ status: "ok" });
}
