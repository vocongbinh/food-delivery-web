import { StatisticsApi } from "@/apis/statistics";
import { Restaurant } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryStatistic = (restaurantId: Restaurant["id"]) => {
  return useQuery({
    queryKey: ["categorystatistic", restaurantId],
    queryFn: () => StatisticsApi.getCategoryStatistic(restaurantId),
    enabled: restaurantId != null,
  });
};
export const useGetOrderStatistic = (restaurantId: Restaurant["id"]) => {
  return useQuery({
    queryKey: ["orderstatistic", restaurantId],
    queryFn: () => StatisticsApi.getOrderStatistic(restaurantId),
    enabled: restaurantId != null,
  });
};
export const useGetTopDishStatistic = (restaurantId: Restaurant["id"]) => {
  return useQuery({
    queryKey: ["topdishstatistic", restaurantId],
    queryFn: () => StatisticsApi.getTopDishStatistic(restaurantId),
    enabled: restaurantId != null,
  });
};
export const useGetDateRangeStatistic = (restaurantId: Restaurant["id"]) => {
  return useQuery({
    queryKey: ["daterangestatistic", restaurantId],
    queryFn: () =>
      StatisticsApi.getDateRangeStatistics({
        restaurantId,
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // One month ago
        endDate: new Date(),
      }),
    enabled: !!restaurantId, // Ensures the query only runs if restaurantId is valid
  });
};
