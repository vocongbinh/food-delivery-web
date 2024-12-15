import { CartsApi } from "@/apis/carts";
import { USER_CART_KEY } from "@/contains/react_query_keys";
import { CartItem, CartItemRequest, UpdateCartRequest } from "@/types/cartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpsertCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: CartItemRequest) => CartsApi.upsertCartItem(cart),
    onSuccess: (cart: CartItem) => {
      queryClient.invalidateQueries({
        queryKey: [USER_CART_KEY],
      });
    },
  });
};
export const useUpdateCartQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: UpdateCartRequest) => CartsApi.updateCartQuantity(cart),
    onSuccess: (cart: CartItem) => {
      queryClient.invalidateQueries({
        queryKey: [USER_CART_KEY],
      });
    },
  });
};
