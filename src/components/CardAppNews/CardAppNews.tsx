"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { Blog, PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import { formatDate, getStrapiMedia } from "@/utils/apiHelpers";
import Image from "next/image";

export interface CardAppNewsProps {
  className?: string;
  blog: Blog;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const CardAppNews: FC<CardAppNewsProps> = ({
  className = "h-full",
  blog,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { name, featuredImage, id, publishedAt } = blog;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-CardAppNews relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
      
        <Image
          alt="featured"
          fill
          className="object-cover"
          src={getStrapiMedia(featuredImage.data.attributes.url) || ""}
          sizes="(max-width: 600px) 480px, 800px"
        />
       
      </div>
      <Link href={`/news/${id}`} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col space-y-3">
      <span className="text-xs text-neutral-500">{formatDate(publishedAt)}</span>
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={name}>
            {name}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default CardAppNews;
