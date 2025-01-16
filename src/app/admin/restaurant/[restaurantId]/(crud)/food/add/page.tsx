"use client";
import FoodDetailInfor from "@/components/FoodDetail/FoodDetail";

export default function Page({
  params,
}: {
  params: { restaurantId: number; dishId: number };
}) {
  return <>{<FoodDetailInfor restaurantId={params.restaurantId} />}</>;
}
