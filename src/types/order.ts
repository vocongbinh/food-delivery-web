import { User } from "./user";

export type OrderRequest = {
  address: string;
  note: string;
  cartItemIds: number[];
  voucherIds: number[];
  paymentMethod: string;
};
export enum OrderStatus {
  PENDING = 1,
  PROCESSING = 2,
  CANCELED = 3,
  DELIVERING = 4,
  DELIVERED = 5,
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
};

export type OrderNFT = {
  orderId: string;
  image: string;
  attributes: [
    {
      trait_type: string;
      value: string | number;
    }
  ]

}

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
