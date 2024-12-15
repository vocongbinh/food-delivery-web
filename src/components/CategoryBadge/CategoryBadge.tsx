import { PostDataType, TwMainColor } from "@/data/types";
import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";
import { DishType } from "@/types";

export interface CategoryBadgeProps {
  className?: string;
  itemClass?: string;
  dishType: DishType;
}

const colors: TwMainColor[] = ["red", "pink", "yellow", "blue"];

const CategoryBadge: FC<CategoryBadgeProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  dishType,
}) => {
  return (
    <div className={`nc-CategoryBadge ${className}`} data-nc-id="CategoryBadge">
      <Badge
        className={itemClass}
        name={dishType.name}
        href={"#"}
        color={colors[Math.floor(Math.random() * colors.length)]}
      />
    </div>
  );
};

export default CategoryBadge;
