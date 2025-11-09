import type { Request, Response, NextFunction } from "express";
import type { ApiErrorPayload } from "../types/index";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import errorLogger from "../utils/errorLogger.util";

export default function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  let shouldLogError: boolean = true;
  let statusCode = 500;

  let responsePayload: ApiErrorPayload = {
    status: "error",
    error: "Internal server error",
  };

  // invalid payload/json body
  if (error instanceof SyntaxError && "body" in error) {
    shouldLogError = false;
    statusCode = 400;
    responsePayload = {
      status: "fail",
      error: "Invalid JSON payload",
    };
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    shouldLogError = false;
    statusCode = 400;
    responsePayload = {
      status: "fail",
      error: error.issues,
    };
  }

  // Prisma known request errors
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const cause = error?.meta?.cause;
    const modelName = error?.meta?.modelName;

    switch (error.code) {
      case "P2000":
        statusCode = 400;
        responsePayload = {
          status: "fail",
          error: "One of the provided fields exceeds its allowed length.",
        };
        break;
      case "P2001":
      case "P2025":
        statusCode = 404;
        const defaultMsg = "The requested resource was not found.";
        const msg = cause && modelName ? `${modelName} - ${cause}` : undefined;

        responsePayload = {
          status: "fail",
          error: msg || defaultMsg,
        };
        break;
      case "P2002":
        statusCode = 409;
        responsePayload = {
          status: "fail",
          error: "A record with this value already exists.",
        };
        break;
      case "P2003":
        statusCode = 400;
        responsePayload = {
          status: "fail",
          error: "Cannot complete the operation due to related data constraints.",
        };
        break;
      case "P2011":
        statusCode = 400;
        responsePayload = {
          status: "fail",
          error: "A required field is missing.",
        };
        break;
      default:
        statusCode = 500;
        responsePayload = {
          status: "error",
          error: "A database error occurred.",
        };
        break;
    }
  }

  // Prisma unknown errors
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    responsePayload = {
      status: "error",
      error: "An unknown database error occurred.",
    };
  }

  // Prisma initialization or runtime errors
  else if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    statusCode = 500;
    responsePayload = {
      status: "error",
      error: "Database connection error.",
    };
  }

  shouldLogError && errorLogger({ error, req, responsePayload, statusCode });

  return res.status(statusCode).json(responsePayload);
}
