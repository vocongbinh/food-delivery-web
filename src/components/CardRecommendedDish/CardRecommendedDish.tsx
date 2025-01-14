"use client";
import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import PostCardMetaV2 from "@/components/PostCardMeta/PostCardMetaV2";
import Link from "next/link";
import { RecommendedDish } from "@/types/recommendedDish";
import FoodFeaturedMedia from "../DishFeaturedMedia/FoodFeaturedMedia";
import { Dish } from "@/types";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import CardRecommendMeta from "../CardRecommendMeta/CardRecommenData";
import { useRouter } from "next/navigation";
export interface CardRecommendedDishProps {
  className?: string;
  dish: Dish;
}

const CardRecommendedDish: FC<CardRecommendedDishProps> = ({ className = "h-full", dish }) => {
  const { id, name } = dish;
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`nc-CardRecommendedDish relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <FoodFeaturedMedia dish={dish} isHover={isHover} />
        </div>
        <div className="group">
        <div
          className="absolute inset-0 bg-neutral-900 bg-opacity-0 z-10 group-hover:bg-opacity-50 transition-opacity flex justify-center duration-300 items-center">
            <button onClick={() => router.push(`/detail-recommended-dish/${name}`)} className="text-white bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-3 rounded-full text-lg">Explore Now</button>
        </div>
        </div>
       
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 rtl:space-x-reverse">
        <CategoryBadge dishType={dish.dishType} />
        <PostCardSaveAction dishId={dish.id} />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <CardRecommendMeta meta={dish} />
      </div>
    </div>
  );
};

export default CardRecommendedDish;
