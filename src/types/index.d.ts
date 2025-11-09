import type { Request } from "express";

export type ApiErrorPayload = {
  status: string;
  error: string | object;
};

export type ErrorLoggerType = {
  error: unknown;
  req?: Request;
  responsePayload: ApiErrorPayload;
  statusCode: number;
};
