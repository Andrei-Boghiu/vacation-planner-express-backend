if (!process.env.PORT) {
  throw new Error("Missing environment variable: PORT is required.");
}

export const IS_PROD = process.env.ENVIRONMENT === "production";

export const PORT = Number(process.env.PORT);

if (Number.isNaN(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT environment variable. Must be a positive number.");
}
