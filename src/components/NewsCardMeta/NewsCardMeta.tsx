import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { Blog, PostDataType } from "@/data/types";
import Link from "next/link";
import { formatDate } from "@/utils/apiHelpers";

export interface NewsCardMetaProps {
  className?: string;
  meta: Pick<Blog, "publishedAt" | "createdBy">;
  hiddenAvatar?: boolean;
  avatarSize?: string;
}

const NewsCardMeta: FC<NewsCardMetaProps> = ({
  className = "leading-none text-xs",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
}) => {
  const { publishedAt, createdBy } = meta;
  const {firstname, lastname, } = createdBy.data.attributes;
  const displayName = firstname + " " + lastname;
  return (
    <div
      className={`nc-NewsCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div
        className="relative flex items-center space-x-2 rtl:space-x-reverse"
      >
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={avatarSize}
            imgUrl={""}
            userName={displayName}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {displayName}
        </span>
      </div>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
          {formatDate(publishedAt)}
        </span>
      </>
    </div>
  );
};

export default NewsCardMeta;
