import { Dish } from "@/types";

const Utils = {
  getDishImages: (dish: Dish | undefined): string => {
    return dish?.imageUrl?.split(", ")[0] ?? "";
  },
};
export default Utils;
