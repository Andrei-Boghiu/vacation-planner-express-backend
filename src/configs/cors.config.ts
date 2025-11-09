import { CorsOptions } from "cors";

const CORS_OPTIONS: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: [],
  credentials: true,
};

export default CORS_OPTIONS;
