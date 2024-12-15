import { z } from "zod";

// Schema for validating individual Option Items
const GroupOptionItemSchema = z.object({
  name: z.string().min(1, "Item name is required"), // Ensure item name is not empty
  price: z.number().min(1000, "Price is invalid"), // Price should be positive
});

// Schema for validating the entire Group Option
export const GroupOptionSchema = z
  .object({
    name: z.string().min(1, "Option name is required"), // Ensure option name is not empty
    minimum: z
      .number()
      .int()
      .positive("Minimum must be greater than 0")
      .min(1, "Minimum amount must be at least 1"), // Validate positive integer and greater than 0
    maximum: z
      .number()
      .int()
      .positive("Maximum must be greater than 0")
      .min(1, "Maximum amount must be at least 1"), // Validate positive integer and greater than 0
    isOptional: z.boolean(),
    optionItems: z
      .array(GroupOptionItemSchema)
      .min(1, "At least one option item is required"), // Ensure at least one item exists
  })
  .refine((data) => data.minimum <= data.maximum, {
    message: "Minimum amount must be less than or equal to maximum amount",
    path: ["minimum"], // This error applies to both minimum and maximum fields
  });

// Export the schema for use in forms
export type GroupOptionRequest = z.infer<typeof GroupOptionSchema>;
