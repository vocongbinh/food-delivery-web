import { getFormData } from "./../../utils/api-request";
import { Restaurant } from "@/types/restaurant";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

export class RestaurantsApi {
  static async postRestaurant(request: Omit<Restaurant, "id">): Promise<string> {
    return await apiPost("/Restaurants", request);
  }

  static async getRestaurants(request: FormData): Promise<Restaurant> {
    const response = await apiGet("/categories", getFormData(request));
    return response;
  }

  static async getRestaurantById(id: Restaurant["id"]): Promise<Restaurant> {
    return await apiGet(`/Restaurants/${id}`);
  }

 
  static async putRestaurants(
    request: Partial<Restaurant & Pick<Restaurant, "id">>
  ): Promise<number> {
    return await apiPatch(`/Restaurants/${request.id}`, request);
  }

  static async deleteRestaurant(id: Restaurant["id"]): Promise<number> {
    return await apiDelete(`/Restaurants/${id}`, { id });
  }

  static async deleteManyRestaurants(ids: Restaurant["id"][]): Promise<number> {
    return await apiDelete(`/Restaurants/many`, ids);
  }
}
