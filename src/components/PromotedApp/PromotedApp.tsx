
import React, { FC } from "react";
import { Application, TaxonomyType, TwMainColor } from "@/data/types";
import Badge from "@/components/Badge/Badge";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface PromotedAppProps {
  className?: string;
  application: Application;
  index?: string;
}

const PromotedApp: FC<PromotedAppProps> = ({
  className = "",
  application,
  index,
}) => {
  const { name, logo, href, id } = application;

  return (
    <Link href={`${href}?id=${id}`} className={`flex flex-col ${className}`}>
      <div className="flex-shrink-0 relative w-full aspect-w-1 aspect-h-1 h-0 rounded-3xl overflow-hidden group">
        <Image
          alt="taxonomies"
          src={getStrapiMedia(logo.data.attributes.url) || ""}
          fill
          className="object-cover w-full h-full rounded-2xl"
          sizes="(min-width: 1024px) 12rem, (min-width: 640px) 10rem, 8rem"
          unoptimized={true}
        />
      </div>
     
        <div className="mt-3">
          <h2 className="text-xs text-neutral-900 dark:text-neutral-100 font-medium text-center">
            {name}
          </h2>
        </div>
    </Link>
  );
};

export default PromotedApp;
