export type StatisticCategoryItem = {
  name: string;
  value: string;
};
export type StatisticDateItem = {
  day: string;
  value: string;
};
export type StatisticDateRangeRequest = {
  startDate: Date;
  endDate: Date;
  restaurantId: number;
};

export type OrderStatistic = {
  totalPricePercentChange: string;
  totalQuantity: number;
  cancelQuantity: number;
  totalPrice: number;
  totalQuantity1: number;
  cancelQuantity1: number;
  totalPrice1: number;
  totalQuantityPercentChange: string;
  cancelQuantityPercentChange: string;
};
