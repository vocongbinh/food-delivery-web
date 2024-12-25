"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Application, Token } from "@/data/types";
import Button from "../Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CardApplication from "../CardApplication/CardApplication";
import CardApplication2 from "../CardApplication2/CardApplication2";


export interface SectionAppsOfCategoryProps {
  className?: string;
  heading: string;
  subHeading?: string;
  applications: Application[];
  headingIsCenter?: boolean;
  gridClass?: string;
  tokens?: Token[];
}


const SectionAppsOfCategory: FC<SectionAppsOfCategoryProps> = ({
  heading,
  subHeading = "",
  className = "",
  applications,
  headingIsCenter = false,
  gridClass = "",

}) => {

  return (
    <div className={`nc-SectionAppsOfCategory ${className}`}>

      <div className={`flex justify-between`}>
        <Heading isCenter={headingIsCenter}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          < Button className="!hidden md:!flex " pattern="white" sizeClass="px-6">
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>
      </div>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {applications.map((item, index) => {
          const Component = heading.toLowerCase().includes("social") ? CardApplication2 : CardApplication;
          return  <Component key={index} app={item} index={index + 1} />;
        })}
      </div>



    </div>
  );
};

export default SectionAppsOfCategory;
