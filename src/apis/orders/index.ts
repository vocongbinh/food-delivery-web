import { metadata } from "./../../app/layout";
import { Restaurant } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
import { Order, OrderNFT, OrderRequest, PutOrderRequest } from "@/types/order";
import axios from "axios";

export class OrdersApi {
  static async postOrder(request: OrderRequest): Promise<Order> {
    return await apiPost("/orders", request);
  }

  static async getMyOrders(): Promise<Order[]> {
    const response = await apiGet(`/orders/user`);
    return response;
  }
  static async getOrdersByRestaurant(
    restaurantId: Restaurant["id"]
  ): Promise<Order[]> {
    const response = await apiGet(`/orders/restaurant/${restaurantId}`);
    return response;
  }

  static async getOrderById(id: Order["id"]): Promise<Order> {
    return await apiGet(`/orders/${id}`);
  }

  static async changeOrderStatus(request: PutOrderRequest): Promise<Order> {
    return await apiPut(`/orders/${request.orderId}`, request);
  }
  static async retrieveOrderNFT(walletAddress: string): Promise<OrderNFT[]> {
    const res = await axios.get(
      `https://testnet.tonapi.io/v2/accounts/${walletAddress}/nfts?collection=kQBQJeJuna9qDQEvDLEVamTSnhemKlMa4N2eJUZX6EBwVi3y&limit=100&offset=0&indirect_ownership=false`
    );
    const data = res.data;
    console.log(data);
    const order: OrderNFT[] = data["nft_items"].map((item: any) => {
      const metadata = item["metadata"];
      return {
        orderId: metadata["name"],
        image: "https://ipfs.io/ipfs/" + metadata["image"].split("ipfs://")[1],
        attributes: metadata["attributes"],
      };
    });
    return order;
  }
}
