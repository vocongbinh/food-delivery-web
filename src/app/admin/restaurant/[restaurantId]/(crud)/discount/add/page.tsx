"use client";
import VoucherDetailInfors from "@/components/FoodDetail/VoucherDetail";

export default function Page({ params }: { params: { restaurantId: number } }) {
  return <VoucherDetailInfors restaurantId={params.restaurantId} />;
}
