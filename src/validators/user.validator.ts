import { z } from "zod";

export const userSchema = z
  .object({
    id: z.cuid2(),
    discordId: z.string().min(1, "Discord ID is required"),
    email: z.email(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN"]).optional(),
    availableDays: z.number().int().optional(),
  })
  .strict();

export const updateUserSchema = userSchema
  .omit({ discordId: true, email: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const adminAlterUserSchema = z
  .object({
    role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN"]),
  })
  .strict();
