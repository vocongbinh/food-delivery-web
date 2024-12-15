import { Restaurant } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { Dish, DishRequest } from "@/types/dish";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
import { User } from "@/types/user";
import RecommendController from "@/utils/recommendation";
import { RecommendedDish } from "@/types/recommendedDish";
import endpoint from "@/utils/http";
import { AuthsApi } from "../auths";
import qs from "qs";

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

  static async getByListId(ids: number[]): Promise<Dish[]> {
    const res =  await endpoint.get("dishes/recommend", {
      params: {
        ids,
      },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      } 
    });
    return res.data;
  }
  static async getRecommendedDishes(id: User["id"]) {
    const user = await  AuthsApi.getUserById(id);
    const res = await RecommendController.generateRecommendations(user);
    let recommendedDishes: RecommendedDish[] = [];
    console.log("save local storage")
    localStorage.setItem("recommendedDishes", JSON.stringify(res[0]));
    const ids = res[0].map((dish: RecommendedDish) => {
      const id = dish["RecipeId"];
      return id;
    });
    return await this.getByListId(ids);
  }
  static async getDishesByCategory(restaurantId:number, categoryId: number, page: number, limit: number = 0): Promise<Dish[]> {
    const res = await endpoint.get(`dishes/category/${restaurantId}/${categoryId}`, {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  }
}
