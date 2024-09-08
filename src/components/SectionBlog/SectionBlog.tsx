
"use client";

import React, { FC } from "react";
import { Blog } from "@/data/types";
import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface SectionBlogProps {
  className?: string;
  heading: string;
  blogs: Blog[];
}

const SectionBlog: FC<SectionBlogProps> = ({
  heading,
  className = "",
  blogs,
}) => {

  return (
    <div className={`nc-SectionBlog bg-white rounded-xl ${className}`}>
      <div className={`flex justify-between items-center`}>
       <h2 className="md:text-lg text-base font-semibold flex items-center gap-1">
        <Image src="/target_img.png" alt="" width={20} height={20}/>
        {heading}</h2>
        <div className="h-12 flex">
          < Button pattern="white" sizeClass="px-6">
            <span className="text-blue-600 md:text-sm text-xs">View all</span>
          </Button>
        </div>
      </div>
      <div className={`flex flex-col gap-2 h-[300px] overflow-y-auto`}>
        {blogs.map((item, index) => {
          return <Link href={`/news/${item.id}`} key={index} className="flex flex-row gap-2 items-center hover:text-neutral-500 border-b py-2 border-neutral-200 ">
            <div className="md:w-12 md:h-12 w-10 h-10 rounded-xl">
              <div className="relative aspect-w-1 aspect-h-1 w-full h-0">
              <Image
                alt="taxonomies"
                src={getStrapiMedia(item.featuredImage.data.attributes.url) || ""}
                fill
                className="object-cover w-full h-full rounded-2xl"
                sizes="(min-width: 1024px) 12rem, (min-width: 640px) 10rem, 8rem"
                unoptimized={true}
              />
              </div>
             
            </div>
            <h2 className="flex-1 font-semibold text-sm">{item.name}</h2>
          </Link>
        })}
      </div>
    </div>
  );
};

export default SectionBlog;
