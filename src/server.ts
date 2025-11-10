import express from "express";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";

import SESSION_OPTIONS from "./configs/session.config";
import CORS_OPTIONS from "./configs/cors.config";

import errorHandler from "./middlewares/errorHandler.middleware";

import _systemRoutes from "./routes/_system.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";

import fallbackHandler from "./utils/fallbackHandler.util";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/system", _systemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Handlers
app.use(fallbackHandler); // - 404
app.use(errorHandler);

export default app;
