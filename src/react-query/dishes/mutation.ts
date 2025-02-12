import { DishesApi } from "@/apis/dishes";
import { DISH_KEY, LIST_DISH_KEY } from "@/contains/react_query_keys";
import { Dish, DishRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dish: DishRequest) => DishesApi.putDishes(dish),
    onSuccess: (dish: Dish) => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: [DISH_KEY, dish.id],
      });
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY, dish.restaurant.id, dish.category.id],
      });
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY],
      });
    },
  });
};
export const useAddDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dish: DishRequest) => DishesApi.postDish(dish),
    onSuccess: (dish: Dish) => {
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY, dish.restaurant.id, dish.category.id],
      });
    },
  });
};
