import { RestaurantsApi } from "@/apis/restaurants";
import { DISH_KEY, LIST_DISH_KEY } from "@/contains/react_query_keys";
import { Restaurant, RestaurantRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useUpdateRestaurantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurant: RestaurantRequest) => RestaurantsApi.putRestaurants(restaurant),
    onSuccess: (restaurant: Restaurant) => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: [DISH_KEY, restaurant.id],
      });
    },
  });
};
export const useAddRestaurantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurant: RestaurantRequest) => RestaurantsApi.postRestaurant(restaurant),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY],
      });
    },
  });
};
