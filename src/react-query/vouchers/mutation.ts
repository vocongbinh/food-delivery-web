import { VouchersApi } from "@/apis/vouchers";
import { VOUCHER_KEY, LIST_VOUCHER_KEY } from "@/contains/react_query_keys";
import { Voucher, VoucherRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useAddVoucherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucher: VoucherRequest) => VouchersApi.postVoucher(voucher),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_VOUCHER_KEY],
      });
    },
  });
};
export const useUpdateVoucherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucher: VoucherRequest) => VouchersApi.putVoucher(voucher),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_VOUCHER_KEY],
      });
    },
  });
};
