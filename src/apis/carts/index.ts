import { Restaurant } from "@/types";
import { CartItem } from "@/types/cartItem";
import { apiGet, apiPut } from "@/utils/api-request";

export class CartsApi {
  static async getRestaurantCarts(id: Restaurant["id"]): Promise<CartItem[]> {
    return await apiGet(`/carts/restaurant/${id}`, {
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
