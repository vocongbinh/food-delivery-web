"use client"
import React, { FC } from "react";
import NcBookmark from "../NcBookmark/NcBookmark";
import { UserWishlistApi } from "@/apis/user-wishlist";
import { toast } from "react-toastify";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export interface PostCardSaveActionProps {
  className?: string;
  bookmarkClass?: string;
  readingTime?: number;
  hidenReadingTime?: boolean;
  dishId?: number;
}

const PostCardSaveAction: FC<PostCardSaveActionProps> = ({
  className = "",
  bookmarkClass,
  hidenReadingTime = true,
  readingTime = 3,
  dishId
}) => {
  const { mutate } = useCustomMutation({
    key: "user-wishlist",
    type: "create",
    queryKey: ["wishlist"],
  })
  const handleSave = async () => {
    try {
      if (dishId) {
        mutate({ dishId: dishId });
        toast.success("Saved to wishlist");
        
      }
      return;
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      onClick={handleSave}
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      {!hidenReadingTime && !!readingTime && (
        <span>{readingTime} min read</span>
      )}

      <NcBookmark containerClassName={bookmarkClass} />
    </div>
  );
};

export default PostCardSaveAction;
