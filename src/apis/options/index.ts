import { Dish, Restaurant } from "@/types";
import { GroupOption, GroupOptionRequest } from "@/types/groupOption";
import { apiGet, apiPost, apiPut } from "@/utils/api-request";

export class GroupOptionsApi {
  static async getRestaurantGroupOptions(
    id: Restaurant["id"]
  ): Promise<GroupOption[]> {
    return await apiGet(`/group_options/restaurant/${id}`, {
      id,
    });
  }
  static async getDishGroupOptions(id: Dish["id"]): Promise<GroupOption[]> {
    return await apiGet(`/group_options/dish/${id}`);
  }
  static async upsertGroupOption(
    data: GroupOptionRequest
  ): Promise<GroupOption> {
    return await apiPost(`/group_options`, data);
  }
}
