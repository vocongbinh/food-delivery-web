import { OrdersApi } from "@/apis/orders";
import {
  LIST_DISH_KEY,
  LIST_ORDER_KEY,
  USER_CART_KEY,
} from "@/contains/react_query_keys";
import { DishRequest } from "@/types";
import { OrderRequest, PutOrderRequest } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: OrderRequest) => OrdersApi.postOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_DISH_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [USER_CART_KEY],
      });
    },
  });
};

export const useChangeOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: PutOrderRequest) => OrdersApi.changeOrderStatus(order),
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: [LIST_ORDER_KEY],
      });
    },
  });
};
