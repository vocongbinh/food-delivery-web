import { apiGet, apiPost } from "@/utils/api-request";
import {
  StatisticDateItem,
  StatisticCategoryItem,
  OrderStatistic,
  StatisticDateRangeRequest,
} from "@/types/statistic";
import { Restaurant } from "@/types";

export class StatisticsApi {
  static async getCategoryStatistic(
    restaurantId: Restaurant["id"]
  ): Promise<StatisticCategoryItem[]> {
    return await apiGet(`/statistics/categories_percent/${restaurantId}`);
  }

  static async getOrderStatistic(
    restaurantId: Restaurant["id"]
  ): Promise<OrderStatistic> {
    return await apiGet(`/statistics/order/${restaurantId}`);
  }

  static async getDateRangeStatistics(
    request: StatisticDateRangeRequest
  ): Promise<StatisticDateItem[]> {
    const response = await apiPost(`/statistics/dateRange`, request);
    return response;
  }
}
