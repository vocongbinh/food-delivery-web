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
import { QueryClient, useMutation } from "@tanstack/react-query";
import { CartItem } from "@/types/cartItem";
import { CartsApi } from "@/apis/carts";
import { RESTAURANT_CART_KEY } from "@/contains/react_query_keys";
import DishCartAction from "./DishCartAction";

export interface DishCartItemProps {
  className?: string;
  ratio?: string;
  hiddenAuthor?: boolean;
  dish?: Dish;
  cartItem: CartItem;
}

const DishCartItem: FC<DishCartItemProps> = ({
  className = "h-full",
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  cartItem,
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
          <FoodFeaturedMedia
            dish={cartItem?.dish}
            className="w-10 h-10 rounded-sm"
          />
        </div>
        <h5 className="line-clamp-1 text-sm" title={cartItem?.dish?.name}>
          {cartItem?.dish?.name}
        </h5>
        <DishCartAction cartItem={cartItem} />
      </div>
    </div>
  );
};

export default DishCartItem;
