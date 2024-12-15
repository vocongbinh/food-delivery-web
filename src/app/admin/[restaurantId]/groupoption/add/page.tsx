"use client";
import FoodDetailInfor from "@/components/FoodDetail/FoodDetail";
import FoodOption from "@/components/FoodDetail/FoodOption";
import { useUpdateDishMutation } from "@/react-query/dishes";
import { DishRequest } from "@/types";
import { GroupOptionRequest } from "@/types/groupOption";

export default function Page({ params }: { params: { restaurantId: number } }) {
  const updateDish = useUpdateDishMutation();

  function saveDish(groupOption: GroupOptionRequest) {
    console.log(groupOption);
    // updateDish.mutate(dish);
  }

  return (
    <FoodOption restaurantId={params.restaurantId} saveGroupOption={saveDish} />
  );
}
