import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { Blog, DataResponse, PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";
import NewsCategoryBadList from "../NewsCategoryBadgeList/NewsCategoryBadgeList";
import NewsCardMeta from "../NewsCardMeta/NewsCardMeta";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface CardNews3Props {
  className?: string;
  blog: DataResponse<Blog>;
}

const CardNews3: FC<CardNews3Props> = ({ className = "h-full", blog }) => {
  const {
    name,
    featuredImage,
    description,
    newsCategory,
    publishedAt,
  } = blog.attributes;
  return (
    <div
      className={`nc-CardNews3 relative flex group flex-row items-center sm:p-4 sm:rounded-3xl sm:bg-white sm:dark:bg-neutral-900 sm:border border-neutral-200 dark:border-neutral-700 ${className}`}
    >
      <Link href={`/news/${blog.id}`} className="absolute inset-0 z-0"></Link>
      <div className="flex flex-col flex-grow">
        <div className="space-y-3 mb-4">
          <NewsCategoryBadList category={newsCategory.data} />
          <h2 className={`block font-semibold text-sm sm:text-base`}>
            <Link href={`/news/${blog.id}`} className="line-clamp-2" title={name}>
              {name}
            </Link>
          </h2>
          <NewsCardMeta meta={{ ...blog.attributes }} />
        </div>
      </div>

      <Link
        href={`/news/${blog.id}`}
        className={`block relative flex-shrink-0 w-24 h-24 sm:w-40 sm:h-full ms-3 sm:ms-5 rounded-2xl overflow-hidden z-0`}
      >
        <Image
          sizes="(max-width: 600px) 180px, 400px"
          className="object-cover w-full h-full"
          fill
          src={getStrapiMedia(featuredImage.data.attributes.url) || ""}
          alt={name}
        />
        <span className="absolute bottom-1 start-1">
          <PostTypeFeaturedIcon
            wrapSize="h-7 w-7"
            iconSize="h-4 w-4"
            postType="gallery"
          />
        </span>
      </Link>
    </div>
  );
};

export default CardNews3;
