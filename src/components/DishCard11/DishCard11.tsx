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
import DishCartAction from "../Cart/DishCartAction";

export interface DishCard11Props {
  className?: string;
  ratio?: string;
  hiddenAuthor?: boolean;
  dish?: Dish;
}

const DishCard11: FC<DishCard11Props> = ({
  className = "h-full",
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  dish,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-DishCard11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 h-full ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          {/* <PostFeaturedMedia dish={dish} post={post} isHover={isHover} /> */}
          <FoodFeaturedMedia dish={dish} />
        </div>
      </div>
      {/* <Link href={href} className="absolute inset-0"></Link> */}
      {/* <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={categories} />
      </span> */}

      <div className="p-4 flex flex-col space-y-3">
        {/* {!hiddenAuthor ? (
          <PostCardMeta meta={post} />
        ) : (
          <span className="text-xs text-neutral-500">{dish?.price}</span>
        )} */}
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <h5 className="line-clamp-2" title={dish?.name}>
            {dish?.name}
          </h5>
        </h3>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" />
          <PostCardSaveAction dishId={dish!.id} className="relative" />
        </div>
        <DishCartAction dish={dish} />
        {/* <div className="flex items-end justify-between mt-auto">
          <h3 className="line-clamp-2 font-medium">{dish?.price}</h3>
          <div className="flex gap-4">
            <button className="p-1 bg-gray-300  rounded-md">
              <MinusIcon className="w-4 h-4" />
            </button>
            <div>1</div>
            <button className="p-1 bg-primary-500 text-white rounded-md">
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DishCard11;
