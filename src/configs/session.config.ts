import { SessionOptions } from "express-session";
import { IS_PROD, SESSION_SECRET } from "./env.config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "../prisma/prisma.client";

const TTL = 60_000 * 60 * 8; // 8h

const SESSION_OPTIONS: SessionOptions = {
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 60 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    ttl: TTL,
  }),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: TTL,
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PROD,
  },
};

export default SESSION_OPTIONS;
