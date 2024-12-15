"use client";

import React, { FC, useState } from "react";
import { Dish } from "@/types";
import FoodFeaturedMedia from "../DishFeaturedMedia/FoodFeaturedMedia";
import { CartItem, UpdateCartRequest } from "@/types/cartItem";
import DishCartAction from "./DishCartAction";
import { useUpdateCartQuantityMutation } from "@/react-query/carts";
import Image from "next/image";

export interface DishCartItemProps {
  className?: string;
  ratio?: string;
  hiddenAuthor?: boolean;
  dish?: Dish;
  cartItem: CartItem;
}

const DishCartItem: FC<DishCartItemProps> = ({
  className = "h-full",
  cartItem,
}) => {
  const [isHover, setIsHover] = useState(false);
  const getDishImages = (dish: Dish | undefined): string => {
    return dish?.imageUrl?.split(", ")[0] ?? "";
  };

  return (
    <div
      className={`nc-DishCartItem relative flex flex-col group overflow-hidden bg-white dark:bg-neutral-900 h-min ${className} border-b`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex gap-2 flex-shrink-0 relative w-full rounded-t-3xl px-2 mt-3">
        <div className="rounded-lg overflow-hidden">
          <Image
            alt="featured"
            className="object-cover rounded-sm w-10 h-10"
            src={getDishImages(cartItem.dish)}
            width={10}
            height={10}
          />
        </div>
        <h5 className="line-clamp-1 text-sm" title={cartItem?.dish?.name}>
          {cartItem?.dish?.name}
        </h5>
      </div>
      <DishCartAction cartItem={cartItem} />
    </div>
  );
};

export default DishCartItem;
