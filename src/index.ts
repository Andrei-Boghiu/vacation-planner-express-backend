import "dotenv/config";
import app from "./server";
import getLocalIp from "./utils/getLocalIp.util";
import { PORT } from "./configs/env.config";

const IP: string = getLocalIp();

app.listen(PORT, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
});

process.on("unhandledRejection", (err: unknown) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err: unknown) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});
