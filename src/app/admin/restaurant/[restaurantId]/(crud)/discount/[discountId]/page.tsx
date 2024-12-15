"use client";
import VoucherDetailInfors from "@/components/FoodDetail/VoucherDetail";
import { useGetVoucherQuery } from "@/react-query/vouchers";

export default function Page({
  params,
}: {
  params: { restaurantId: number; discountId: number };
}) {
  const { data: voucher, isSuccess } = useGetVoucherQuery(params.discountId);

  return (
    <>
      {isSuccess && (
        <VoucherDetailInfors
          voucher={voucher}
          restaurantId={params.restaurantId}
        />
      )}
    </>
  );
}
