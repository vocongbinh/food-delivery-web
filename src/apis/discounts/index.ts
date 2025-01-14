import { Restaurant } from "@/types";
import { CartItem } from "@/types/cartItem";
import { Voucher, VoucherUser } from "@/types/voucher";
import { apiGet, apiPut } from "@/utils/api-request";

export class DiscountsApi {
  static async getDiscounts(id: Restaurant["id"]): Promise<Voucher[]> {
    return await apiGet(`/discounts/restaurant/${id}`);
  }
  static async updateCartQuantity(data: {
    id: CartItem["id"];
    quantity: CartItem["quantity"];
  }): Promise<CartItem> {
    return await apiPut(`/carts/${data.id}?quantity=${data.quantity}`, {
      id: data.id,
    });
  }
  static async getActiveDiscounts(): Promise<VoucherUser[]> {
    return await apiGet(`/vouchers?status=ACTIVE`);
  }
}
