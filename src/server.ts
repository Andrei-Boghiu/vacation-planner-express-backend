import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";

import { COOKIE_SECRET, DISCORD_AUTH_PATH, DISCORD_CALLBACK_PATH, SUCCESS_AUTH_REDIRECT } from "./configs/env.config";
import SESSION_OPTIONS from "./configs/session.config";
import CORS_OPTIONS from "./configs/cors.config";

import errorHandler from "./middlewares/errorHandler.middleware";

import _systemRoutes from "./routes/_system.routes";
import usersRoutes from "./routes/users.routes";

import fallbackHandler from "./utils/fallbackHandler.util";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser(COOKIE_SECRET));
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());

// AUTH
app.get(DISCORD_AUTH_PATH, passport.authenticate("discord"));
app.get(DISCORD_CALLBACK_PATH, passport.authenticate("discord"), (_, response) => {
  response.redirect(SUCCESS_AUTH_REDIRECT);
});

// Routes
app.use("/api/system", _systemRoutes);
app.use("/api/users", usersRoutes);

// Handlers
app.use(fallbackHandler); // - 404
app.use(errorHandler);

export default app;
