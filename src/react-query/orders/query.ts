import { OrdersApi } from "@/apis/orders";
import { LIST_ORDER_KEY, MY_ORDER_KEY } from "@/contains/react_query_keys";
import { Restaurant } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersOfRestaurantQuery = (
  restaurantId: Restaurant["id"]
) => {
  return useQuery({
    queryKey: [LIST_ORDER_KEY],
    queryFn: () => OrdersApi.getOrdersByRestaurant(restaurantId),
  });
};

export const useGetMyOrder = () => {
  return useQuery({
    queryKey: [MY_ORDER_KEY],
    queryFn: () => OrdersApi.getMyOrders(),
  });
};
