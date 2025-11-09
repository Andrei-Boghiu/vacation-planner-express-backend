import { User as PrismaUser } from "@prisma/client";
import "express";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
