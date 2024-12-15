import { getFormData } from "./../../utils/api-request";
import { Restaurant } from "@/types/restaurant";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
import endpoint from "@/utils/http";

export class RestaurantsApi {
  static async postRestaurant(
    request: Omit<Restaurant, "id">
  ): Promise<string> {
    return await apiPost("/restaurants", request);
  }

  static async getRestaurants(request: FormData): Promise<Restaurant[]> {
    const response = await apiGet("/restaurants", getFormData(request));
    return response;
  }

  static async getRestaurantsByDistance({
    latitude,
    longitude,
    distance = 5,
    keyword = "",
  }: {
    latitude: number;
    longitude: number;
    distance: number;
    keyword: string;
  }): Promise<Restaurant[]> {
    const response = await endpoint.get(`/restaurants/distance`, {
      params: {
        latitude,
        longitude,
        distance,
        keyword,
      },
    });
    return response.data;
  }

  static async getRestaurantById(id: Restaurant["id"]): Promise<Restaurant> {
    return await apiGet(`/restaurants/${id}`);
    return await apiGet(`/restaurants/${id}`);
  }

  static async putRestaurants(
    request: Partial<Restaurant & Pick<Restaurant, "id">>
  ): Promise<number> {
    return await apiPatch(`/restaurants/${request.id}`, request);
    return await apiPatch(`/restaurants/${request.id}`, request);
  }

  static async deleteRestaurant(id: Restaurant["id"]): Promise<number> {
    return await apiDelete(`/restaurants/${id}`, { id });
    return await apiDelete(`/restaurants/${id}`, { id });
  }

  static async deleteManyRestaurants(ids: Restaurant["id"][]): Promise<number> {
    return await apiDelete(`/restaurants/many`, ids);
    return await apiDelete(`/restaurants/many`, ids);
  }
}
