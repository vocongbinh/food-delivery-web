import { metadata } from "./../../app/layout";
import { Restaurant } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

import {
  Order,
  OrderNFT,
  OrderOfContract,
  OrderRequest,
  PutOrderRequest,
} from "@/types/order";
import axios from "axios";
import { Jetton } from '@/types/jetton';
import { contractEndpoint } from '@/utils/http';

export type MetaData = Omit<OrderOfContract, "id">; 
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

  static async getJettons(walletAddress: string) {
    const res = await axios.get(
      `https://testnet.tonapi.io/v2/accounts/${walletAddress}/jettons?currencies=ton,usd,rub&supported_extensions=custom_payload`
    );
    const jettonData = res.data["balances"][1]["jetton"];
    const balance = res.data["balances"][1]["balance"] / Math.pow(10, 9);
    const data: Jetton = { ...jettonData, balance };
    return data;
  }

  static async deployOrderContract() {
    const data: OrderOfContract = {
      id: 0,
      orderItems: [],
      name: '',
      address: '',
      phone: ''
    }
    const res = await contractEndpoint.post("/deploy-order-contract", data)
    return res.data
  }



static async deployNFT(data: MetaData, address: string, orderId: string) {
    const metadata = {
        ...data,
        image: data.orderItems[0].dish.imageUrl
    }
    try {
        await contractEndpoint.post(`deploy-NFT/${address}`, metadata, {
          params: {
            order_id: orderId
          }
        });
    }
    catch(e) {
        throw new Error("Can not make a transaction!");
    }
   

}
}
