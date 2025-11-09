export const IS_PROD = process.env.ENVIRONMENT === "production";

export const PORT = Number(process.env.PORT);
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

export const BASE_URL = `http://localhost:${PORT}`;

export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
export const SUCCESS_AUTH_REDIRECT = process.env.SUCCESS_AUTH_REDIRECT as string;

export const DISCORD_AUTH_PATH = "/api/auth/discord";
export const DISCORD_CALLBACK_PATH = "/api/auth/discord/redirect";
