import { z } from "zod";

export const AuthSchema = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});
