import { getFormData } from "../../utils/api-request";
import { DishType } from "@/types/dishType";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

export class DishTypesApi {
  static async postDishType(request: Omit<DishType, "id">): Promise<string> {
    return await apiPost("/dish_types", request);
  }

  static async getDishTypes(request: FormData): Promise<DishType> {
    const response = await apiGet("/dish_types", getFormData(request));
    return response;
  }
  static async getDishTypesOverview(): Promise<DishType[]> {
    const response = await apiGet("/dish_types/overview");
    return response;
  }

  static async getDishTypeById(id: DishType["id"]): Promise<DishType> {
    return await apiGet(`/dish_types/${id}`);
  }

 
  static async putDishTypes(
    request: Partial<DishType & Pick<DishType, "id">>
  ): Promise<number> {
    return await apiPatch(`/dish_types/${request.id}`, request);
  }

  static async deleteDishType(id: DishType["id"]): Promise<number> {
    return await apiDelete(`/dish_types/${id}`, { id });
  }

  static async deleteManyDishTypes(ids: DishType["id"][]): Promise<number> {
    return await apiDelete(`/dish_types/many`, ids);
  }
}
