import { number } from "zod";
import { Category } from "./category";
import { DishType } from "./dishType";
import { GroupOption } from "./groupOption";
import { Restaurant } from "./restaurant";

export interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  status?: string;
  category: Category;
  dishType: DishType;
  options: GroupOption[];
  restaurant: { id: number; name: string };
  createdAt: Date;
  updatedAt: Date;
}

export const enum DishClassification {
  LATEST = "LATEST",
  BEST_SELLER = "BEST_SELLER",
  RELATED = "RELATED",
}

export type DishRequest = Omit<Dish, "category" | "dishType" | "restaurant"> & {
  categoryId: Category["id"];
  dishTypeId: DishType["id"];
  restaurantId: Restaurant["id"];
};
