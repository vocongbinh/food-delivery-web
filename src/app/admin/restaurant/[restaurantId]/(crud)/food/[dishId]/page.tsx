"use client";
import FoodDetailInfor from "@/components/FoodDetail/FoodDetail";
import { useGetDishQuery, useUpdateDishMutation } from "@/react-query/dishes";
import { DishRequest } from "@/types";
import { useEffect } from "react";

export default function Page({
  params,
}: {
  params: { restaurantId: number; dishId: number };
}) {
  const { data: dish, isSuccess } = useGetDishQuery(params.dishId);
  return (
    <>
      {isSuccess && (
        <FoodDetailInfor dish={dish} restaurantId={params.restaurantId} />
      )}
    </>
  );
}
