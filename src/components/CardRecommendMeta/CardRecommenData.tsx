import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import { Dish } from "@/types";

export interface CardRecommendMetaProps {
  meta: Dish;
  hiddenAvatar?: boolean;
  className?: string;
  titleClassName?: string;
  avatarSize?: string;
}

const CardRecommendMeta: FC<CardRecommendMetaProps> = ({
  meta,
  hiddenAvatar = true,
  className = "leading-none text-xs",
  titleClassName = "text-base",
  avatarSize = "h-9 w-9 text-base",
}) => {
  const { name, description } = meta;
  return (
    <div
      className={`nc-CardRecommendMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
        <div>
          <h2 className={`block font-semibold ${titleClassName}`}>
            <Link href={"#"} className="line-clamp-1">
              {name}
            </Link>
          </h2>

          <h2 className="flex mt-1.5">
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium line-clamp-2">
              {description}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardRecommendMeta;
