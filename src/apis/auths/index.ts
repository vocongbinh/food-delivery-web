import {
  AuthRequest,
  AuthResponse,
  HealthCondition,
  RegisterRequest,
  Restaurant,
  UserInfo,
} from "@/types";
import { apiPut, getFormData } from "../../utils/api-request";
import { Dish, DishRequest } from "@/types/dish";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/utils/api-request";
import { User } from "@/types/user";
import RecommendController, { getWeightLoss } from "@/utils/recommendation";

export class AuthsApi {
  static async login(request: AuthRequest): Promise<AuthResponse> {
    return await apiPost("/auth/sign-in", request);
  }
  static async signup(request: RegisterRequest): Promise<AuthResponse> {
    return await apiPost("/auth/sign-up", request);
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
      "activity" | "age" | "height" | "weight" | "weightLoss" | "mealPerDay" | "gender"
    >,
  ): Promise<Dish> {
    return await apiPut(`/auth/`, data);
  }

  static async putAuths(request: DishRequest): Promise<Dish> {
    return await apiPut(`/dishes/${request.id}`, request);
  }

  static async getUserCondition(): Promise<HealthCondition> {
    const user = await AuthsApi.getUserProfile();
    const totalCalories =
      getWeightLoss(user.weightLoss!) * RecommendController.caloriesCalculator(user);

    const weightRatio = [1, 0.9, 0.8, 0.6]
    const weightLoss = ["Maintain weight", "Mild weight loss", "Weight loss", "Extreme weight loss"]
    const weightValue = ["-0 kg/week", "-0.25 kg/week", "-0.5 kg/week", "-1 kg/week"]
    const bmi = user.weight! / (user.height! / 100) ** 2;
    let status = "", color = "";
    if (bmi < 18.5) {
      status = "Underweight";
      color = "red"
    }
    else if (bmi >= 18.5 && bmi < 25) {
      status = "Normal";
      color = "green"
    }
    else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";
      color = "yellow"
    }
    else {
      status = "Obesity"
      color = "red"
    }
    return {
      calories: weightRatio.map((ratio, index) => (
        {
          calo: parseFloat((totalCalories * ratio).toFixed(2)),
          type: weightLoss[index],
          value: weightValue[index]
        })),
      color,
      result: status,
      bmi
    }

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
