import { Request, Response, NextFunction } from "express";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

export function managerRoleGuard(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userRole = req.user?.role;
  if (userRole === "MANAGER" || userRole === "ADMIN") return next();

  return res.status(403).json({ error: "Forbidden: Manager role required" });
}

export function adminRoleGuard(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userRole = req.user?.role;
  if (userRole === "ADMIN") return next();

  return res.status(403).json({ error: "Forbidden: Admin role required" });
}
