import { z } from "zod";

export const OrderRequestSchema = z.object({
  address: z.string().min(1, "This field is required"),
  note: z.string().min(1, "This field is required"),
  paymentMethod: z.number(),
});
