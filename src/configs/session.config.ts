import { SessionOptions } from "express-session";
import { IS_PROD, SESSION_SECRET } from "./env.config";

const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60_000 * 60 * 8, // 8h
    httpOnly: IS_PROD,
    secure: IS_PROD,
  },
};

export default SESSION_OPTIONS;
