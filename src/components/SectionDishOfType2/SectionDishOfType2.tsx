import React, { FC } from "react";
import Card2 from "@/components/Card2/Card2";
import { PostDataType } from "@/data/types";
import Card6 from "@/components/Card6/Card6";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
export interface SectionDishOfType2Props {
  posts: PostDataType[];
  heading?: string;
  subHeading?: string;
  className?: string;
}

const SectionDishOfType2: FC<SectionDishOfType2Props> = ({
  posts,
  heading = "Latest Articles 🎈 ",
  subHeading,
  className = "",
}) => {
  return (
    <div className={`nc-SectionDishOfType2 ${className}`}>
      <div className={`flex justify-between`}>
        <Heading desc={subHeading} isCenter={false}>
          {heading}
        </Heading>
        <div className="h-12 flex">
          < Button className="!hidden md:!flex " pattern="white" sizeClass="px-6">
            <span>View all</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Button>
        </div>
      </div>
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDishOfType2;
