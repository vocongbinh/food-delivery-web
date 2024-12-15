import { getFormData } from "../../utils/api-request";
import { DishType } from "@/types/dishType";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
const DISH_TYPE_ROUTE = "/dish_types";
export class DishTypesApi {
  static async postDishType(request: Omit<DishType, "id">): Promise<string> {
    return await apiPost(DISH_TYPE_ROUTE, request);
  }

  static async getDishTypes(): Promise<DishType[]> {
    const response = await apiGet(DISH_TYPE_ROUTE);
    console.log(response);
    return response;
  }

  static async getDishTypeById(id: DishType["id"]): Promise<DishType> {
    return await apiGet(`${DISH_TYPE_ROUTE}/${id}`);
  }

  static async putDishTypes(
    request: Partial<DishType & Pick<DishType, "id">>
  ): Promise<number> {
    return await apiPatch(`${DISH_TYPE_ROUTE}/${request.id}`, request);
  }

  static async deleteDishType(id: DishType["id"]): Promise<number> {
    return await apiDelete(`${DISH_TYPE_ROUTE}/${id}`, { id });
  }

  static async deleteManyDishTypes(ids: DishType["id"][]): Promise<number> {
    return await apiDelete(`${DISH_TYPE_ROUTE}/many`, ids);
  }
}
