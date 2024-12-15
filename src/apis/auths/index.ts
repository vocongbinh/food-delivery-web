import { AuthRequest, AuthResponse, Restaurant, UserInfo } from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { Dish, DishRequest } from "@/types/dish";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
import { User } from "@/types/user";

export class AuthsApi {
  static async login(request: AuthRequest): Promise<AuthResponse> {
    return await apiPost("/auth/sign-in", request);
  }

  static async getUserProfile(): Promise<UserInfo> {
    const response = await apiGet(`/auth/profile`);
    return response;
  }

  static async getDishById(id: Dish["id"]): Promise<Dish> {
    return await apiGet(`/dishes/${id}`);
  }

  static async updateUser(
    data: Pick<
      User,
      "activity" | "age" | "height" | "weight" | "weightLoss" | "mealPerDay"
    >,
    id: User["id"]
  ): Promise<Dish> {
    return await apiPut(`/auth/update/${id}`, data);
  }

  static async putAuths(request: DishRequest): Promise<Dish> {
    console.log("put");
    return await apiPut(`/dishes/${request.id}`, request);
  }

  static async deleteDish(id: Dish["id"]): Promise<number> {
    return await apiDelete(`/dishes/${id}`, { id });
  }

  static async deleteManyAuths(ids: Dish["id"][]): Promise<number> {
    return await apiDelete(`/dishes/many`, ids);
  }

  static async getUserById(id: User["id"]): Promise<User> {
    return await apiGet(`/auth/${id}`);
  }
}
