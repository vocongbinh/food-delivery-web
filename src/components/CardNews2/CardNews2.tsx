import React, { FC } from "react";
import { Blog, DataResponse } from "@/data/types";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/apiHelpers";
import NewsCategoryBadList from "../NewsCategoryBadgeList/NewsCategoryBadgeList";
import NewsCardMeta from "../NewsCardMeta/NewsCardMeta";

export interface CardNews2Props {
  className?: string;
  blog: DataResponse<Blog>;
  size?: "normal" | "large";
}

const CardNews2: FC<CardNews2Props> = ({
  className = "h-full",
  size = "normal",
  blog,
}) => {
  const {
    name,
    featuredImage,
    description,
    newsCategory,
    publishedAt,
  } = blog.attributes;

  return (
    <div className={`nc-CardNews2 group relative flex flex-col ${className}`}>
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] z-0">
        <Image
          fill
          sizes="(max-width: 600px) 480px, 800px"
          className="object-cover rounded-3xl"
          src={getStrapiMedia(featuredImage.data.attributes.url) || ""}
          alt={name}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType="gallery"
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
        <NewsCategoryBadList
          className="flex flex-wrap space-x-2 absolute top-3 left-3"
          itemClass="relative"
          category={newsCategory.data}
        />
      </div>

      <Link href={`/news/${blog.id}`} className="absolute inset-0" />

      <div className="mt-5 px-4 flex flex-col">
        <div className="space-y-3">
          <NewsCardMeta
            className="relative text-sm"
            avatarSize="h-8 w-8 text-sm"
            meta={blog.attributes}
          />

          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 ${
              size === "large" ? "text-base sm:text-lg md:text-xl" : "text-base"
            }`}
          >
            <Link href={`/news/${blog.id}`} className="line-clamp-2" title={name}>
              {name}
            </Link>
          </h2>
          <span className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6 ">
           {description}
          </span>
        </div>
        <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>
      </div>
    </div>
  );
};

export default CardNews2;
