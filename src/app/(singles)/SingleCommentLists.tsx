import React, { FC } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ReviewCard from "@/components/CommentCard/ReviewCard ";
import { Review } from "@/types/review";

export interface SingleCommentListsProps {
  reviews?: Review[];
  restaurantId: number;
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({
  reviews = [],
  restaurantId,
}) => {
  return (
    <>
      <ul className="nc-SingleCommentLists space-y-5">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} restaurantId={restaurantId} />
        ))}
        {/* <ButtonPrimary className="dark:bg-primary-700 w-full">
        View full comments
        </ButtonPrimary> */}
      </ul>
      {reviews.length == 0 && (
        <div className="w-full text-center">
          There is no review about your food
        </div>
      )}
    </>
  );
};

export default SingleCommentLists;
