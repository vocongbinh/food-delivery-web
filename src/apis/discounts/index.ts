import { Restaurant } from "@/types";
import { CartItem } from "@/types/cartItem";
import { Voucher } from "@/types/voucher";
import { apiGet, apiPut } from "@/utils/api-request";
import http from "@/utils/http";

export class DiscountsApi {
  static async getDiscounts(id: Restaurant["id"]): Promise<Voucher[]> {
    return await apiGet(`/discounts/restaurant/${id}`, {
      id,
    });
  }
  static async updateCartQuantity(data: {
    id: CartItem["id"];
    quantity: CartItem["quantity"];
  }): Promise<CartItem> {
    return await apiPut(`/carts/${data.id}?quantity=${data.quantity}`, {
      id: data.id,
    });
  }
}
