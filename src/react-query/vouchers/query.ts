import { DiscountsApi } from "@/apis/discounts";
import { VouchersApi } from "@/apis/vouchers";
import { LIST_VOUCHER_KEY, VOUCHER_KEY } from "@/contains/react_query_keys";
import { Restaurant, Voucher } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetVoucherQuery = (voucherId: Voucher["id"]) => {
  return useQuery({
    queryKey: [VOUCHER_KEY, voucherId],
    queryFn: () => VouchersApi.getVoucherById(voucherId),
    enabled: voucherId != null,
  });
};
export const useGetVoucherByRestaurant = (restaurantId: Restaurant["id"]) => {
  return useQuery({
    queryKey: [LIST_VOUCHER_KEY, restaurantId],
    queryFn: () => DiscountsApi.getDiscounts(restaurantId),
  });
};
