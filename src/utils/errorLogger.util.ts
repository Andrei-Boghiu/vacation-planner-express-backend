import type { ErrorLoggerType } from "../types/index";
import consoleLogError from "./consoleLogError.util";

export default function errorLogger({ error, req, responsePayload, statusCode }: ErrorLoggerType): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    responsePayload,
    statusCode,
    request: req
      ? {
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
          user: (req as any).user?.id ?? "anonymous",
        }
      : undefined,
    error,
  };

  consoleLogError(logEntry);
}
