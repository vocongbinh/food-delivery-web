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
}

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

export interface UserVoucherRequest {
    code: string;
    productDiscountId: number;
}