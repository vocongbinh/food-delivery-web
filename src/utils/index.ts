import { Dish } from "@/types";
import { OrderStatus } from "@/types/order";

const Utils = {
  getDishImages: (dish: Dish | undefined): string => {
    return dish?.imageUrl?.split(", ")[0] ?? "";
  },
  formatCurrency: (value: number) => {
    let roundedValue = Math.round(value);
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Math.round(roundedValue / 1000) * 1000);
  },
  orderStatusToString: (value: OrderStatus) => {
    if (value === OrderStatus.PENDING) {
      return "Pending";
    } else if (value === OrderStatus.DELIVERED) {
      return "Delivered";
    } else if (value === OrderStatus.DELIVERING) {
      return "Delivering";
    } else if (value === OrderStatus.CANCELED) {
      return "Canceled";
    } else if (value === OrderStatus.PROCESSING) {
      return "Processing";
    } else return "Pending";
  },
};
export default Utils;
