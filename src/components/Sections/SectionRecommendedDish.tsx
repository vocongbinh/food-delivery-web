import React, { FC, ReactNode } from "react";
import Card3 from "@/components/Card3/Card3";
import Heading from "@/components/Heading/Heading";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card14 from "@/components/Card14/Card14";
import Card10V2 from "@/components/Card10/Card10V2";
import Card15Podcast from "@/components/Card15Podcast/Card15Podcast";
import { RecommendedDish } from "@/types/recommendedDish";
import { Dish } from "@/types";
import CardRecommendedDish from "../CardRecommendedDish/CardRecommendedDish";

export interface SectionRecommendedDishProps {
  dishes: Dish[];
  className?: string;
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast";
}

const SectionRecommendedDish: FC<SectionRecommendedDishProps> = ({
  dishes,
  postCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
}) => {
  const renderCard = (dish: Dish) => {
    return <CardRecommendedDish dish={dish}/>

  };

  return (
    <div className={`nc-SectionRecommendedDish relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter}>
        {heading}
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {dishes.map((dish) => renderCard(dish))}
      </div>
      <div className="flex mt-20 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionRecommendedDish;
