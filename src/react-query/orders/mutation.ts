import { OrdersApi } from "@/apis/orders";
import { LIST_DISH_KEY } from "@/contains/react_query_keys";
import { DishRequest } from "@/types";
import { OrderRequest } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: OrderRequest) => OrdersApi.postOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY],
      });
    },
  });
};
