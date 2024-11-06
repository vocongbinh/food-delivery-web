import { Category } from "./category";
import { DishType } from "./dishType";
import { Restaurant } from "./restaurant";

export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  status?: string;
  category: Category;
  dishType: DishType;
};
export type DishRequest = Omit<Dish, "category" | "dishType"> & {
  categoryId: Category["id"];
  dishTypeId: DishType["id"];
  restaurantId: Restaurant["id"];
};
