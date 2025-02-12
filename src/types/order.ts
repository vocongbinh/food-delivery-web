import { Dish, DishOfContract } from "./dish";
import { User } from "./user";
import { Voucher } from "./voucher";

export type OrderRequest = {
  address: string;
  note: string;
  cartItemIds: number[];
  voucherIds: number[];
  paymentMethod: number;
};
export enum OrderStatus {
  PENDING = 1,
  PROCESSING = 2,
  CANCELED = 3,
  DELIVERING = 4,
  DELIVERED = 5,
}
export function orderStatusToString(status: OrderStatus) {
  if (status == OrderStatus.PENDING) return "PENDING";
  if (status == OrderStatus.PROCESSING) return "PROCESSING";
  if (status == OrderStatus.DELIVERING) return "DELIVERING";
  if (status == OrderStatus.CANCELED) return "CANCELED";
  if (status == OrderStatus.DELIVERED) return "DELIVERED";
}
export enum OrderNFTStatus {
  PENDING = 0,
  DELIVERING = 1,
  DELIVERED = 2,
  CANCELED = 3
}
export type PutOrderRequest = {
  orderId: number;
  orderStatus: OrderStatus;
};
export type OrderLineItem_OptionItem = {
  optionItemId: number;
  quantity: number;
};
export type Order = {
  id: number;
  orderStatus: string;
  deliveryStatus: string;
  failureMessages: string;
  price: number;
  address: string;
  user?: User;
  options: {
    groups: OrderLineItem_GroupOption[];
    price: number;
  };
  created_at: string;
  updated_at: string;
  items: OrderLineItem[];
};

export type OrderNFT = {
  orderId: string;
  image: string;
  attributes: [
    {
      trait_type: string;
      value: string | number;
    }
  ];
};

export type OrderLineItem_Option = {
  optionId: number;
  optionName: string;
  price: number;
};
export type OrderLineItem_GroupOption = {
  groupOptionId: number;
  groupOptionName: string;
  selectedOptions: OrderLineItem_Option[];
};

export type OrderLineItem = {
  id: number;
  options: OrderLineItem_GroupOption[];
  dish: Dish;
  quantity: number;
  subtotal: number;
};

export type OrderContractItemRequest = {
  dish: DishOfContract;
  quantity: number;
};

export type OrderContractRequest = {
  orderItems: OrderContractItemRequest[];
  vouchers: Voucher[];
};
export interface OrderItem {
  dish: DishOfContract;
  quantity: number;
}

export interface OrderOfContract {
  id: number;
  orderItems: OrderItem[];
  name: string;
  address: string;
  phone: string;
}
