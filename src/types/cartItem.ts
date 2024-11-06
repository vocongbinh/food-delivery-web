import { Dish } from "./dish";

export interface CartItem {
  dish: Dish;
  id: string;
  quantity: number;
  total: number;
}
