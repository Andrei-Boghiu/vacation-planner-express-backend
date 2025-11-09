import { SessionOptions } from "express-session";
import { SESSION_SECRET } from "./env.config";

const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  },
};

export default SESSION_OPTIONS;
