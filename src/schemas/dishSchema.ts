import { z } from "zod";

export const DishSchema = z.object({
  categoryId: z.number().min(1),
  dishTypeId: z.number().min(1),
  name: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  price: z.number().min(1, "This field is required"),
  imageUrl: z.string().min(1, "This field is required"),
});
