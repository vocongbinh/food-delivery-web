import { DiscountType } from "@/types/voucher";
import { z } from "zod";

export const VoucherRequestSchema = z.object({
  restaurantId: z.any(),
  name: z.string(),
  description: z.string(),
  discountValue: z.number(),
  validFrom: z.union([z.date(), z.string()]), // Date or string
  validTo: z.union([z.date(), z.string()]), // Date or string
  couponCode: z.string(),
  maximumDiscountValue: z.number(),
  discountType: z.nativeEnum(DiscountType), // Zod's nativeEnum for enums
  image: z.string(),
  exchangeRate: z.number(),
});
