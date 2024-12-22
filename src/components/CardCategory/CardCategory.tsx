"use client";
import React, { FC, useState } from "react";
import { Category } from "@/data/types";
import { getStrapiMedia } from "@/utils/apiHelpers";
import Image from "next/image";
import Badge from "../Badge/Badge";
import Link from "next/link";
import { DishType } from "@/types/dishType";
import { Route } from "next";
export interface CardCategoryProps {
  className?: string;
  dishType: DishType;
  index: number;
}

const CardCategory: FC<CardCategoryProps> = ({ className = "h-full", dishType, index }) => {
  const { dishes, name, id} = dishType;
  const [isHover, setIsHover] = useState(false);
  const images = dishes.map(dish => {
    const dishImgs = dish.imageUrl?.split(",");
    return dishImgs![0]
  });
  const itemClassName = "lg:w-16 w-14 lg:h-16 h-14 border border-white rounded-full border-2 transition duration-300";
  return (
    <Link href={`/categories/${id}` as Route}>
       <div
      className={`nc-CardCategory h-[35vh] rounded-3xl bg-white group hover:bg-opacity-50 flex flex-col p-4 items-center cursor-pointer ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Badge name={index} color="gray" className="self-start"/>
       {images.length > 2 && ( 
      <div className="relative w-full z-10 flex items-center justify-center">
        <div className={`absolute top-0 right-1/2 group-hover:-translate-x-1/2 ${itemClassName}`}>
          <Image className="rounded-full" alt="" src={images[0]} fill />
        </div>
        <div className={`relative ${itemClassName}`}>
          <Image className="rounded-full" alt="" src={images[1]} fill />
        </div>
        <div className={`absolute top-0 left-1/2 group-hover:translate-x-1/2 ${itemClassName}`}>
          <Image className="rounded-full" alt="" src={images[2]} fill/>
        </div>

      </div>
    )}
        <h2 className={`block font-semibold lg:text-xl text-lg p-4`}>
          {dishType.name}
        </h2>
     
      {/* <Link href={href} className="absolute inset-0" />
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <CategoryFeaturedMedia dishType={dishType} isHover={isHover} />
        </div>

        
      </div> */}
     
    </div>
    </Link>
 
  );
};

export default CardCategory;
