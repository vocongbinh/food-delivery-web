import { Dish } from "./dish";

export type CartItem = {
  dish: Dish;
  id: number;
  quantity: number;
  total: number;
  options: CartItem_SelectedOptions;
};
export type UpdateCartRequest = {
  id: number;
  quantity: number;
};
export type CartItemRequest = {
  quantity: number;
  cartItemGroupOptionRequests: CartItem_GroupOptionRequest[];
  dishId: number;
};
export type CartItem_GroupOptionRequest = {
  groupOptionId: number;
  selectedOptions: number[];
};
export type CartItem_GroupOptionResponse = CartItem_GroupOptionRequest;
export type CartItem_SelectedOptions = {
  selectedOptions: CartItem_GroupOptionRequest;
};
