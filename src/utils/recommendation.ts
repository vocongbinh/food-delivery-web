import { User } from "@/types/user";
import { recommendEndpoint } from "./http";
import axios from "axios";
import { parse } from "node-html-parser";
import { UserInfo } from "@/types";

class ImageFinder {
  static async getImagesLinks(searchTerm: string): Promise<string> {
    try {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchTerm
      )}&site=webhp&tbm=isch`;

      const response = await axios.get(searchUrl, {
        headers: {
          // Fake a User-Agent to bypass Google's protection
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
        },
      });

      const html = response.data;
      const root = parse(html);
      const imgUrls = root
        .querySelectorAll("img")
        .map((img) => img.getAttribute("src"));
      return imgUrls.length > 0 ? (imgUrls[0] as string) : "Not found link";
    } catch (error) {
      console.error("Error fetching image links:", error);
      return "Not found link";
    }
  }
}
const plans = [
  "Maintain weight",
  "Mild weight loss",
  "Weight loss",
  "Extreme weight loss",
];

const weights = [1, 0.9, 0.8, 0.6];

const weightLosses = [
  "-0 kg/week",
  "-0.25 kg/week",
  "-0.5 kg/week",
  "-1 kg/week",
];

interface MealPerc {
  breakfast: number;
  morningSnack?: number;
  lunch: number;
  afternoonSnack?: number;
  dinner: number;
}

export const getWeightLoss = (option: string) =>
  weights[plans.indexOf(option)];

const generator = async ({
  nutritionInput,
  ingredients = [],
  params = { n_neighbors: 5, return_distance: false },
}: {
  nutritionInput: number[];
  ingredients?: string[];
  params?: any;
}) => {
  const request = {
    nutrition_input: nutritionInput,
    ingredients: ingredients,
    params: params,
  };
  try {
    const res = await recommendEndpoint.post("/predict", request);
    console.log(res.data);
    return res.data;
  } catch (error:any) {
    console.error("Error posting to predict endpoint:", error);
    if (error.response) {
      console.error("Response error:", error.response.data);
    }
  }
};
export const getMealsPerc = (numberOfMeal: number): MealPerc => {
  if (numberOfMeal == 3) {
    return { breakfast: 0.35, lunch: 0.4, dinner: 0.25 };
  } else if (numberOfMeal == 4) {
    return {
      breakfast: 0.3,
      morningSnack: 0.05,
      lunch: 0.4,
      dinner: 0.25,
    };
  } else {
    return {
      breakfast: 0.3,
      morningSnack: 0.05,
      lunch: 0.4,
      afternoonSnack: 0.05,
      dinner: 0.2,
    };
  }
};
class RecommendController {
  static caloriesCalculator(user: UserInfo): number {
    const activities = [
      "Little/no exercise",
      "Light exercise",
      "Moderate exercise (3-5 days/week)",
      "Very active (6-7 days/week)",
      "Extra active (very active & physical job)",
    ];
    const weights = [1.2, 1.375, 1.55, 1.725, 1.9];
    const weight = weights[activities.indexOf(user.activity)];
    console.log(`weight: ${weight}`);
    const maintainCalories = this.calculateBmr(user) * weight;
    return maintainCalories;
  }

  static calculateBmr(user: UserInfo): number {
    let bmr: number;
    if (user.gender === "male") {
      bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! + 5;
    } else {
      bmr = 10 * user.weight! + 6.25 * user.height! - 5 * user.age! - 161;
    }
    console.log(bmr);
    return bmr;
  }

  static rnd(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  static async generateRecommendations(user: UserInfo): Promise<any> {
    console.log(user.weightLoss);
    const totalCalories =
      getWeightLoss(user.weightLoss!) * this.caloriesCalculator(user);
    console.log(totalCalories);
    const recommendations: any[] = [];
    const mealsCaloriesPerc = getMealsPerc(user.mealPerDay!);
    console.log(mealsCaloriesPerc);
    for (const [key, value] of Object.entries(mealsCaloriesPerc)) {
      const mealCalories = value * totalCalories;

      let recommendedNutrition: number[];
      if (key === "breakfast") {
        recommendedNutrition = [
          mealCalories,
          this.rnd(10, 30),
          this.rnd(0, 4),
          this.rnd(0, 30),
          this.rnd(0, 400),
          this.rnd(40, 75),
          this.rnd(4, 10),
          this.rnd(0, 10),
          this.rnd(30, 100),
        ];
      } else if (key === "lunch") {
        recommendedNutrition = [
          mealCalories,
          this.rnd(20, 40),
          this.rnd(0, 4),
          this.rnd(0, 30),
          this.rnd(0, 400),
          this.rnd(40, 75),
          this.rnd(4, 20),
          this.rnd(0, 10),
          this.rnd(50, 175),
        ];
      } else if (key === "dinner") {
        recommendedNutrition = [
          mealCalories,
          this.rnd(20, 40),
          this.rnd(0, 4),
          this.rnd(0, 30),
          this.rnd(0, 400),
          this.rnd(40, 75),
          this.rnd(4, 20),
          this.rnd(0, 10),
          this.rnd(50, 175),
        ];
      } else {
        recommendedNutrition = [
          mealCalories,
          this.rnd(10, 30),
          this.rnd(0, 4),
          this.rnd(0, 30),
          this.rnd(0, 400),
          this.rnd(40, 75),
          this.rnd(4, 10),
          this.rnd(0, 10),
          this.rnd(30, 100),
        ];
      }
      console.log(recommendedNutrition);
      //   const generator = new Generator({ nutritionInput: recommendedNutrition });
      const generatorRes = await generator({
        nutritionInput: recommendedNutrition,
      });
      const recommendedRecipes = generatorRes.output;
      recommendations.push(recommendedRecipes);
    }
    return recommendations;
  }
}

export default RecommendController;
