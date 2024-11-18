export interface RecommendedDish {
    RecipeId: number;
    Name: string;
    CookTime: string;
    PrepTime: string;
    TotalTime: string;
    RecipeIngredientParts: string[];
    Calories: number;
    FatContent: number;
    SaturatedFatContent: number;
    CholesterolContent: number;
    SodiumContent: number;
    CarbohydrateContent: number;
    FiberContent: number;
    SugarContent: number;
    ProteinContent: number;
    imageLink: string; // Mapped from `image_link`
    RecipeInstructions: string[];
  }
  