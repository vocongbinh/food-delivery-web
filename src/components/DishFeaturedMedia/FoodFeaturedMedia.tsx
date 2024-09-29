"use client";

import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import GallerySlider from "./GallerySlider";
import Image from "next/image";
import { Dish } from "@/types";

export interface PostFeaturedMediaProps {
  className?: string;
  isHover?: boolean;
  dish?: Dish;
}

const FoodFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  dish,
}) => {
  const toListImage = (dish: Dish | undefined): string[] => {
    return dish?.imageUrl?.split(", ").map((url) => url.trim()) ?? [];
  };
  const dishImages = toListImage(dish);

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {dishImages.length == 1 && (
        <Image
          alt="featured"
          fill
          className="object-cover"
          src={dishImages[0]}
          sizes="(max-width: 600px) 480px, 800px"
        />
      )}
      {dishImages.length > 1 && (
        <GallerySlider
          galleryImgs={dishImages}
          className="absolute inset-0 z-10"
          galleryClass="absolute inset-0"
          ratioClass="absolute inset-0"
        />
      )}
    </div>
  );
};

export default FoodFeaturedMedia;
