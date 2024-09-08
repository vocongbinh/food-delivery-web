"use client";

import React, { FC } from "react";
import { Application, PostDataType } from "@/data/types";
import Link from "next/link";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import Image from "next/image";
import { PauseIcon, PlayIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { getStrapiMedia } from "@/utils/apiHelpers";
import Badge from "../Badge/Badge";
import WidgetSocial from "../WidgetSocial/WidgetSocial";

export interface CardApplicationProps {
  className?: string;
  app: Application;
  index?: number;
}

const CardApplication: FC<CardApplicationProps> = ({
  className = "h-full",
  app,
  index
}) => {
  const { name, href, subTitle, logo, id } = app;
  return (
    <div
      className={`nc-CardApplication relative  hover:bg-opacity-50 flex group p-3 items-start rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="w-1/4 flex-shrink-0 relative">
        <Link
          href={`${href}?id=${id}`}
          className="block h-0 aspect-w-1 aspect-h-1 relative rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            className="object-cover w-full h-full"
            src={getStrapiMedia(logo.data.attributes.url) || ""}
            fill
            alt={name}
            sizes="100px"
          />
        </Link>
        {index && (
            <Badge
              name={index}
              className="absolute bottom-0 right-0"
            />
          )}
      </div>

      <div className="flex flex-col flex-grow ms-4">
        <h2 className={`nc-card-title block font-semibold text-sm sm:text-lg`}>
          <Link
            href={`${href}?id=${id}`}
            className={`line-clamp-1 flex gap-2 items-center`}
            title={name}
          >
            {name}
            <ShieldCheckIcon className="w-5 h-5 text-blue-600"/>
          </Link>
        </h2>
        <span className="text-base text-neutral-500 dark:text-neutral-400 my-1 ">
          {subTitle}
        </span>
        <WidgetSocial isAndroid isIOS isInternal isTelegram/>
      </div>
    </div>
  );
};

export default CardApplication;
