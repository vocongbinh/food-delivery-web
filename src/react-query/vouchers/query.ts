import { VouchersApi } from "@/apis/vouchers";
import { VOUCHER_KEY } from "@/contains/react_query_keys";
import { Dish, Voucher } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetVoucherQuery = (voucherId: Voucher["id"]) => {
  return useQuery({
    queryKey: [VOUCHER_KEY, voucherId],
    queryFn: () => VouchersApi.getVoucherById(voucherId),
    enabled: voucherId != null,
  });
};
