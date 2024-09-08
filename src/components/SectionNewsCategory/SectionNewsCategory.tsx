import React, { FC } from "react";
import { Blog, DataResponse, PostDataType } from "@/data/types";
import HeaderFilter from "../Sections/HeaderFilter";
import CardNews2 from "../CardNews2/CardNews2";
import CardNews3 from "../CardNews3/CardNews3";
import Heading from "../Heading/Heading";
import CardNews from "../CardNews/CardNews";
import { retrieveObjectFromResponse } from "@/utils/retrieveDataFromResponse";

export interface SectionNewsCategoryProps {
  blogs: DataResponse<Blog>[];
  heading: string;
  className?: string;
  index: number;
}

const SectionNewsCategory: FC<SectionNewsCategoryProps> = ({
  blogs,
  heading,
  className = "",
  index
}) => {
  return (
    <div className={`nc-SectionNewsCategory ${className}`}>
      <Heading desc="">{heading}</Heading>
      {!blogs.length && <span>Nothing we found!</span>}
      {index === 0 ?   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {blogs[0] && <CardNews2 size="large" blog={blogs[0]} />}
        <div className="grid gap-6 md:gap-8">
          {blogs
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <CardNews3 key={index} blog={item} />
            ))}
        </div>
      </div> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogs
          .filter((_, i) => i < 3)
          .map((item, index) => (
            <CardNews key={index} blog={retrieveObjectFromResponse(item)} />
          ))}
    </div>
      }
    
    </div>
  );
};

export default SectionNewsCategory;
