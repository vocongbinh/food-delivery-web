import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Home from "./home";
import { DishTypesApi } from "@/apis/dishtypes";
import { RestaurantsApi } from "@/apis/restaurants";
import {
  DISH_TYPE_KEY,
  RESTAURANT_CART_KEY,
} from "@/contains/react_query_keys";
import { CartsApi } from "@/apis/carts";
import { DishesApi } from "@/apis/dishes";

const restaurantId = 36;
export default async function PageHome() {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [DISH_TYPE_KEY],
        queryFn: () => DishTypesApi.getDishTypes(),
      }),
      queryClient.prefetchQuery({
        queryKey: [RESTAURANT_CART_KEY, restaurantId],
        queryFn: () => CartsApi.getRestaurantCarts(restaurantId),
      }),
      queryClient.prefetchQuery({
        queryKey: ["restaurants"],
        queryFn: () => RestaurantsApi.getRestaurants(new FormData()),
      }),
      queryClient.prefetchQuery({
        queryKey: ["recommend-dish"],
        queryFn: () => DishesApi.getRecommendedDishes(),
      }),
    ]);
  } catch (error) {
    console.error("Error prefetching queries:", error);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="nc-PageHome relative ">
        <div className="">
          <Home />
        </div>
      </div>
    </HydrationBoundary>
  );
}
