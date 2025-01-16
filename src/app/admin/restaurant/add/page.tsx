"use client";
import RestaurantDetailInfor from "@/components/FoodDetail copy/RestaurantDetail";
export default function Page({ params }: { params: { restaurantId: number } }) {
  return <RestaurantDetailInfor />;
}
