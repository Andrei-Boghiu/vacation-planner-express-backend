export default function consoleLogError(logEntry: Record<string, any>): void {
  const { timestamp, statusCode, request, responsePayload, error } = logEntry;

  console.group(`\x1b[31m[ERROR] ${timestamp || new Date().toISOString()}\x1b[0m`);
  if (statusCode !== undefined) {
    console.log(`Status: \x1b[33m${statusCode}\x1b[0m`);
  }

  if (request) {
    console.table({
      Method: request.method,
      URL: request.url,
      IP: request.ip,
      User: request.user ?? "anonymous",
    });
  }

  if (responsePayload) {
    console.log("\nResponse Payload:");
    console.dir(responsePayload, { depth: null, colors: true });
  }

  if (error) {
    console.log("\nError Details:");
    console.dir(error, { depth: null, colors: true });
  }

  console.groupEnd();
}
