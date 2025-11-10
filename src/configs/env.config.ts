export const IS_PROD = process.env.ENVIRONMENT === "production";

export const PORT = Number(process.env.PORT);
export const SESSION_SECRET = process.env.SESSION_SECRET as string;

export const BASE_URL = `http://localhost:${PORT}`;

export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;

export const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID as string;
export const BITBUCKET_CLIENT_SECRET = process.env.BITBUCKET_CLIENT_SECRET as string;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const SUCCESS_AUTH_REDIRECT = process.env.SUCCESS_AUTH_REDIRECT as string;
