"use client";
import { DishesApi } from "@/apis/dish";
import FoodDetailInfor from "@/components/FoodDetail/FoodDetail";
import { DISH_KEY } from "@/contains/react_query_keys";
import { useGetDishQuery, useUpdateDishMutation } from "@/react-query/dishes";
import { DishRequest } from "@/types";

export default function Page({
  params,
}: {
  params: { dishId: number; restaurantId: number };
}) {
  const { data: dish } = useGetDishQuery(params.dishId);
  return (
    dish && <FoodDetailInfor restaurantId={params.restaurantId} dish={dish} />
  );
}
