"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Category } from "@/data/types";
import MySlider from "@/components/MySlider";
import CategoryExplorer from "../CategoryExplorer/CategoryExplorer";

export interface SectionSliderExplorerProps {
  className?: string;
  heading: string;
  categories: Category[];
  itemPerRow?: number;
}

const SectionSliderExplorer: FC<SectionSliderExplorerProps> = ({
  heading = "",
  className = "",
  categories,
  itemPerRow = 5,
}) => {
  return (
    <div className={`nc-SectionSliderExplorer ${className}  `}>
      <Heading desc="" isCenter>
        {heading}
      </Heading>
      <MySlider
        className="px-20"
        itemPerRow={itemPerRow}
        data={categories}
        renderItem={(item, index) => (
          <CategoryExplorer key={index} category={item} />
        )}
      />
    </div>
  );
};

export default SectionSliderExplorer;
