import { z } from "zod";

export const AuthSchema = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});
export const RegisterSchema = z.object({
  username: z.string().min(1, "This field is required"),
  fullname: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
  role: z.string().min(1, "This field is required"),
});
