import { SessionOptions } from "express-session";
import { IS_PROD, SESSION_SECRET } from "./env.config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "../prisma/prisma.client";

const SESSION_OPTIONS: SessionOptions = {
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  }),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60_000 * 60 * 8, // 8h
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PROD,
  },
};

export default SESSION_OPTIONS;
