import { CartsApi } from "@/apis/carts";
import { USER_CART_KEY } from "@/contains/react_query_keys";
import { useQuery } from "@tanstack/react-query";

export const useGetCartItemsQuery = () => {
  return useQuery({
    queryKey: [USER_CART_KEY],
    queryFn: () => CartsApi.getUserCarts(),
  });
};
