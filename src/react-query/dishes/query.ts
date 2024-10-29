import { DishesApi } from "@/apis/dish";
import { DISH_KEY } from "@/contains/react_query_keys";
import { Dish } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDishQuery = (dishId: Dish["id"]) => {
  return useQuery({
    queryKey: [DISH_KEY, dishId],
    queryFn: () => DishesApi.getDishById(dishId),
    enabled: dishId != null,
  });
};
