import { Category, DataResponse, NewsCategory, PostDataType } from "@/data/types";
import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";

export interface NewsCategoryBadListPropsProps {
  className?: string;
  itemClass?: string;
  category: DataResponse<NewsCategory>;
}

const NewsCategoryBadList: FC<NewsCategoryBadListPropsProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  category,
}) => {
  const {name, href, color}= category.attributes;
  return (
    <div
      className={`nc-NewCategoryBadListProps ${className}`}
      data-nc-id="NewCategoryBadListProps"
    >

        <Badge
          className={itemClass}
          name={name}
          href={href}
          color={color as any}
        />
    </div>
  );
};

export default NewsCategoryBadList;
