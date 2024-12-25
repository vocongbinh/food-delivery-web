"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";

export interface CardRestaurantProps {
  className?: string;
  restaurant: Restaurant;
  ratio?: string;
  hiddenAuthor?: boolean;
  isAdmin?: boolean;
}

const CardRestaurant: FC<CardRestaurantProps> = ({
  className = "h-full",
  restaurant,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  isAdmin = false,
}) => {
  const { name, description, imageUrl, id } = restaurant;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-CardRestaurant relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <Image
            alt="featured"
            fill
            className="object-cover"
            src={imageUrl}
            sizes="(max-width: 600px) 480px, 800px"
          />
        </div>
      </div>
      <Link
        href={!isAdmin ? `/restaurants/${id}` : `/admin/restaurant/${id}`}
        className="absolute inset-0"
      ></Link>
      <div className="p-4 flex flex-col space-y-3">
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={name}>
            {name}
          </span>
        </h3>
        <span className="line-clamp-2 text-sm text-neutral-500" title={name}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default CardRestaurant;
