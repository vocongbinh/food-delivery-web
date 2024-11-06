import { Restaurant } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { Dish, DishRequest } from "@/types/dish";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

export class DishesApi {
  static async postDish(request: DishRequest): Promise<Dish> {
    return await apiPost("/dishes", request);
  }

  static async getDishes(id: Restaurant["id"]): Promise<Dish[]> {
    const response = await apiGet(`/dishes/restaurant/${id}`);
    return response;
  }

  static async getDishById(id: Dish["id"]): Promise<Dish> {
    return await apiGet(`/dishes/${id}`);
  }

  static async putDishes(request: DishRequest): Promise<Dish> {
    console.log("put");
    return await apiPut(`/dishes/${request.id}`, request);
  }

  static async deleteDish(id: Dish["id"]): Promise<number> {
    return await apiDelete(`/dishes/${id}`, { id });
  }

  static async deleteManyDishes(ids: Dish["id"][]): Promise<number> {
    return await apiDelete(`/dishes/many`, ids);
  }
}
