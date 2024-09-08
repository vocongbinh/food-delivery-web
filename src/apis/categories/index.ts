import { getFormData } from "./../../utils/api-request";
import { Category } from "@/types/category";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";

export class CategoriesApi {
  static async postCategory(request: Omit<Category, "id">): Promise<string> {
    return await apiPost("/categories", request);
  }

  static async getCategories(request: FormData): Promise<Category> {
    const response = await apiGet("/categories", getFormData(request));
    return response;
  }

  static async getCategoryById(id: Category["id"]): Promise<Category> {
    return await apiGet(`/categories/${id}`);
  }

 
  static async putCategories(
    request: Partial<Category & Pick<Category, "id">>
  ): Promise<number> {
    return await apiPatch(`/categories/${request.id}`, request);
  }

  static async deleteCategory(id: Category["id"]): Promise<number> {
    return await apiDelete(`/categories/${id}`, { id });
  }

  static async deleteManyCategories(ids: Category["id"][]): Promise<number> {
    return await apiDelete(`/categories/many`, ids);
  }
}
