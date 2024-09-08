"use client";

import React, { FC } from "react";
import { Category } from "@/data/types";

import ImagesSlider from "./ImagesSlider";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface CategoryFeaturedMediaProps {
  className?: string;
  category: Category;
  isHover?: boolean;
}

const CategoryFeaturedMedia: FC<CategoryFeaturedMediaProps> = ({
  className = "w-full h-full",
  category,
  isHover = false,
}) => {
  const { featuredApp, id, href } =
    category;
  const images = featuredApp.data.map(app => app.attributes.logo.data);

  const renderGallerySlider = () => {
    if (!images) return null;
    return images.length > 0 && ( 
      <div className="relative w-full z-10 flex items-center justify-center transition duration-300">
        <div className="absolute top-0 right-1/2 group-hover:-translate-x-4">
          <Image alt="" src={getStrapiMedia(images[0].attributes.url) || ""} width={40} height={40} />
        </div>
        <div className="rounded-full">
          <Image alt="" src={getStrapiMedia(images[0].attributes.url) || ""} width={40} height={40} />
        </div>
        <div className="absolute top-0 left-1/2 group-hover:translate-x-4">
          <Image alt="" src={getStrapiMedia(images[0].attributes.url) || ""} width={40} height={40} />
        </div>

      </div>
    );
  };

  const renderContent = () => {
    return renderGallerySlider();
  };

  return (
    renderContent()
  );
};

export default CategoryFeaturedMedia;
