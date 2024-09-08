import React, { FC } from "react";
import { Category, PostAuthorType } from "@/data/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar/Avatar";
import NcImage from "@/components/NcImage/NcImage";
import Link from "next/link";
import Image from "next/image";

export interface CategoryExplorerProps {
    className?: string;
    category: Category;
}

const CategoryExplorer: FC<CategoryExplorerProps> = ({
    className = "",
    category,
}) => {
    const { name, description, images, href, icon } = category;
    return (
        <Link
            href={href}
            className={`flex flex-row justify-center py-2 bg-neutral-300 dark:bg-neutral-800 rounded-2xl ${className}`}
        >
            <span className={`text-sm font-semibold`}>{name}</span>
        </Link>
    );
};

export default CategoryExplorer;
