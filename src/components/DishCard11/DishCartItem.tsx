"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import { Dish } from "@/types";
import FoodFeaturedMedia from "../DishFeaturedMedia/FoodFeaturedMedia";
import MinusIcon from "@heroicons/react/24/solid/MinusIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

export interface DishCartItemProps {
  className?: string;
  ratio?: string;
  hiddenAuthor?: boolean;
  dish?: Dish;
}

const DishCartItem: FC<DishCartItemProps> = ({
  className = "h-full",
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  dish,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-DishCartItem relative flex flex-col group overflow-hidden bg-white dark:bg-neutral-900 h-min ${className} border-b`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div className="flex gap-2 flex-shrink-0 relative w-full rounded-t-3xl px-2 mt-3">
        <div className="rounded-lg overflow-hidden">
          <FoodFeaturedMedia dish={dish} className="w-10 h-10 rounded-sm" />
        </div>
        <h5 className="line-clamp-1 text-sm" title={dish?.name}>
          {dish?.name}
        </h5>
      </div>
      <div className="p-4 flex flex-col space-y-3">
        <div className="flex items-end justify-between mt-auto ml-10">
          <h3 className="line-clamp-2 font-medium text-sm">{dish?.price}đ</h3>
          <div className="flex gap-4">
            <button className="p-1 bg-gray-300  rounded-md">
              <MinusIcon className="w-3 h-3" />
            </button>
            <div className="text-sm">1</div>
            <button className="p-1 bg-primary-500 text-white rounded-md">
              <PlusIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCartItem;
