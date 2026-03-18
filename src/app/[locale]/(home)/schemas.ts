import { z } from "zod";

const emailSchema = z.email("invalidEmailError").min(1, "minEmailError").trim();

const passwordSchema = z
  .string()
  .min(6, "minPasswordError")
  .max(20, "maxPasswordError")
  .regex(/[A-Z]/, "mustContainUppercase")
  .regex(/[a-z]/, "mustContainLowercase")
  .regex(/[0-9]/, "mustContainNumber")
  .regex(/[^a-zA-Z0-9]/, "mustContainSpecialCharacter")
  .trim();

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "passwordsDoNotMatch",
    path: ["confirmPassword"],
  });
