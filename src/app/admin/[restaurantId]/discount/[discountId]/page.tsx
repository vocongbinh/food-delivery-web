"use client";
import FoodDetailInfor from "@/components/FoodDetail/FoodDetail";
import { useUpdateDishMutation } from "@/react-query/dishes";
import { DishRequest } from "@/types";

export default function Page({ params }: { params: { restaurantId: number } }) {
  const updateDish = useUpdateDishMutation();

  function saveDish(dish: DishRequest) {
    updateDish.mutate(dish);
  }

  return (
    <FoodDetailInfor restaurantId={params.restaurantId} saveDish={saveDish} />
  );
}
