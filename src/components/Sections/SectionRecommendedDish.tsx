import React, { FC, ReactNode } from "react";
import Heading from "@/components/Heading/Heading";
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
      {/* <div className="flex mt-20 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionRecommendedDish;
