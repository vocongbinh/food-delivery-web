import { Information } from 'iconsax-react';
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
import { InformationProps } from '@/contexts/information/information-context';
import { recomposeColor } from "@mui/material";

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
    return await apiPut(`/dishes/${request.id}`, request);
  }

  static async deleteDish(id: Dish["id"]): Promise<number> {
    return await apiDelete(`/dishes/${id}`, { id });
  }

  static async deleteManyDishes(ids: Dish["id"][]): Promise<number> {
    return await apiDelete(`/dishes/many`, ids);
  }

  static async getByListName(names: string[]): Promise<Dish[]> {
    console.log("start")
    const res = await endpoint.get("dishes/recommend", {
      params: {
        names,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    const recommendedDishes: RecommendedDish[] = JSON.parse(localStorage.getItem("recommendedDishes") || "[]");
    console.log("recommended dishes", recommendedDishes)
    recommendedDishes.forEach((recommendedDish: RecommendedDish) => {
      console.log(recommendedDish.Name)
      console.log(res.data)
          const dish:Dish = res.data.find((d: Dish) => d.name === recommendedDish["Name"]);
          console.log(dish)
          recommendedDish.imageLink = dish.imageUrl!.split(", ")[0];
    })
    console.log(recommendedDishes)
    localStorage.setItem("recommendedDishes", JSON.stringify(recommendedDishes));
    return res.data;
  }
  static async getRecommendedDishes() {
    const user = await AuthsApi.getUserProfile();
    console.log(user)
    const res = await RecommendController.generateRecommendations(user);
    localStorage.setItem("recommendedDishes", JSON.stringify(res[0]));
    const names = res[0].map((dish: RecommendedDish) => {
      const name = dish["Name"];
      return name;
    });
    return await this.getByListName(names);
  }
  static async getDishesByCategory(
    restaurantId: number,
    categoryId: number,
    page: number,
    limit: number = 0
  ): Promise<Dish[]> {
    const res = await endpoint.get(
      `dishes/category/${restaurantId}/${categoryId}`,
      {
        params: {
          page,
          limit,
        },
      }
    );
    return res.data;
  }
}
