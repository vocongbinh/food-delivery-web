import { Dish } from "./dish";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface Voucher {
  id: number;
  dish: Dish; // Reference to Dish ID
  restaurant: Restaurant; // Reference to Restaurant ID
  name: string;
  description: string;
  conditions: string;
  discountValue: number;
  discountUnit: number;
  maxUsed: number;
  createdTime: Date | string; // ISO date string
  validFrom: Date | string; // ISO date string
  validTo: Date | string; // ISO date string
  couponCode: string;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  discountType: DiscountType;
  image: string;
  exchangeRate: number;
  remainingUsed: number;
}
export interface VoucherRequest {
  id: number;
  restaurantId: Restaurant["id"];
  name: string;
  description: string;
  discountValue: number;
  validFrom: Date | string;
  validTo: Date | string;
  couponCode: string;
  maximumDiscountValue: number;
  discountType: DiscountType;
  image: string;
  exchangeRate: number;
}
export type ExchangeVoucherRequest = {
  productDiscountId: number;
  code: string;
};

export interface VoucherUser {
  id: number;
  user: User;
  productDiscount: Voucher;
  status: string;
  remainingUsage: number;
}

// DiscountType Enum
export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "AMOUNT",
}
export const DiscountTypes: Array<{ name: string; type: DiscountType }> = [
  {
    name: "Percent",
    type: DiscountType.PERCENTAGE,
  },
  {
    name: "Fixed",
    type: DiscountType.FIXED_AMOUNT,
  },
];

export interface UserVoucherRequest {
  code: string;
  productDiscountId: number;
}
