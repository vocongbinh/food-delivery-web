import { Restaurant } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

export class OrdersApi {
  static async postOrder(request: OrderRequest): Promise<Order> {
    console.log("ee");
    return await apiPost("/orders", request);
  }

  static async getMyOrders(): Promise<Order[]> {
    const response = await apiGet(`/orders/user`);
    return response;
  }

  static async getOrderById(id: Order["id"]): Promise<Order> {
    return await apiGet(`/orders/${id}`);
  }

  static async changeOrderStatus(request: PutOrderRequest): Promise<Order> {
    return await apiPut(`/orders/${request.orderId}`, request);
  }
}
