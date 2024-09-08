"use client";

import React, { FC, useState } from "react";
import { Blog, PostDataType } from "@/data/types";
import Link from "next/link";
import { formatDate, getStrapiMedia } from "@/utils/apiHelpers";
import Image from "next/image";
import NewsCategoryBadList from "../NewsCategoryBadgeList/NewsCategoryBadgeList";
import NewsCardMeta from "../NewsCardMeta/NewsCardMeta";
export interface CardNewsProps {
  className?: string;
  blog: Blog;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const CardNews: FC<CardNewsProps> = ({
  className = "h-full",
  blog,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { name,  publishedAt, id, featuredImage, newsCategory, description } = blog;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-CardNews relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
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
          src={getStrapiMedia(featuredImage.data.attributes.url) || ""}
          sizes="(max-width: 600px) 480px, 800px"
        />
        </div>
      </div>
      <Link href={`/news/${id}`} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <NewsCategoryBadList category={newsCategory.data} />
      </span>

      <div className="p-4 flex flex-col space-y-3">
        <NewsCardMeta meta={blog}/>
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={name}>
            {name}
          </span>
        </h3>
        <span className="text-sm font-medium line-clamp-2">{description}</span>
      </div>
    </div>
  );
};

export default CardNews;
