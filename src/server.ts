import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import prisma from "./prisma/prisma.client";

import { COOKIE_SECRET, DISCORD_AUTH_PATH, DISCORD_CALLBACK_PATH, SUCCESS_AUTH_REDIRECT } from "./configs/env.config";
import CORS_OPTIONS from "./configs/cors.config";
import { isAuthenticated } from "./middleware/auth.middleware";
import SESSION_OPTIONS from "./configs/session.config";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser(COOKIE_SECRET));
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get(DISCORD_AUTH_PATH, passport.authenticate("discord"));

app.get(DISCORD_CALLBACK_PATH, passport.authenticate("discord"), (_, response) => {
  response.redirect(SUCCESS_AUTH_REDIRECT);
});

app.get("/public", (req, res) => {
  res.json({ data: "public data" });
});

app.use(isAuthenticated);

app.get("/private", (req, res) => {
  res.json({ data: "private data", user: req.user });
});

app.get("/api/users", async (req, res) => {
  const data = await prisma.user.findMany();

  res.send(data);
});

export default app;
