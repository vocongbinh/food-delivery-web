import React, { FC } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CommentCard from "@/components/CommentCard/CommentCard";
import ReviewCard from "@/components/CommentCard/ReviewCard ";
import { Review } from "@/data/types";

export interface SingleCommentListsProps {
  reviews?: Review[]
  
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({ reviews  = [] }) => {
  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}

      {/* <ButtonPrimary className="dark:bg-primary-700 w-full">
        View full comments
      </ButtonPrimary> */}
    </ul>
  );
};

export default SingleCommentLists;
