"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Application, PostDataType, Token } from "@/data/types";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CardApplication from "../CardApplication/CardApplication";
import CardApplication2 from "../CardApplication2/CardApplication2";
import { Dish } from "@/types/dish";
import MySlider from "../MySlider";
import Card11 from "../Card11/Card11";

export interface SectionDishOfTypeProps {
  className?: string;
  heading: string;
  subHeading?: string;
  headingIsCenter?: boolean;
  posts: PostDataType[];
  perView?: 2 | 3 | 4;
}


const SectionDishOfType: FC<SectionDishOfTypeProps> = ({
  heading,
  subHeading = "",
  className = "",
  posts,
  headingIsCenter = false,
  perView = 4,
}) => {

  return (
    <div className={`nc-SectionAppsOfCategory ${className}`}>

      <div className={`flex justify-between`}>
        <Heading desc={subHeading} isCenter={headingIsCenter}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          < Button className="!hidden md:!flex " pattern="white" sizeClass="px-6">
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>
      </div>
      <MySlider
        data={posts}
        renderItem={(item, indx) => <Card11 key={indx} post={item} />}
        itemPerRow={perView}
      />



    </div>
  );
};

export default SectionDishOfType;
