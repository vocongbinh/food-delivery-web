import { Restaurant } from "@/types";
import { CartItem, CartItemRequest, UpdateCartRequest } from "@/types/cartItem";
import { apiGet, apiPost, apiPut } from "@/utils/api-request";

export class CartsApi {
  static async getRestaurantCarts(id: Restaurant["id"]): Promise<CartItem[]> {
    return await apiGet(`/carts/restaurant/${id}`, {
      id,
    });
  }
  static async getUserCarts(): Promise<CartItem[]> {
    return await apiGet(`/carts/user`);
  }
  static async updateCartQuantity(data: UpdateCartRequest): Promise<CartItem> {
    return await apiPut(`/carts/${data.id}?quantity=${data.quantity}`, {
      id: data.id,
    });
  }
  static async upsertCartItem(data: CartItemRequest): Promise<CartItem> {
    return await apiPost(`/carts`, data);
  }
}
