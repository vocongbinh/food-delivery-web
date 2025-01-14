"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { PostDataType } from "@/data/types";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Dish } from "@/types/dish";
import MySlider from "../MySlider";
import DishCard11 from "../DishCard11/DishCard11";

export interface SectionDishOfTypeProps {
  className?: string;
  heading: string;
  subHeading?: string;
  headingIsCenter?: boolean;
  posts: PostDataType[];
  perView?: 2 | 3 | 4;
  dishes: Dish[];
}

const SectionDishOfType: FC<SectionDishOfTypeProps> = ({
  heading,
  subHeading = "",
  className = "",
  posts,
  headingIsCenter = false,
  perView = 4,
  dishes,
}) => {
  return (
    <div className={`nc-SectionAppsOfCategory ${className}`}>
      <div className={`flex justify-between`}>
        <Heading desc={subHeading} isCenter={headingIsCenter}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          <Button
            className="!hidden md:!flex "
            pattern="white"
            sizeClass="px-6"
          >
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>
      </div>
      <MySlider
        data={dishes}
        renderItem={(item, indx) => <DishCard11 key={indx} dish={item} />}
        itemPerRow={perView}
      />
    </div>
  );
};

export default SectionDishOfType;
