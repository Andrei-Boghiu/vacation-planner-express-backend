import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: [],
  credentials: true,
};

export default corsConfig;
