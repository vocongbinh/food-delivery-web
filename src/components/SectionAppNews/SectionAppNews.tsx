"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { Blog } from "@/data/types";
import CardAppNews from "../CardAppNews/CardAppNews";
export interface SectionAppNewsProps {
    className?: string;
    heading: string;
    subHeading?: string;
    headingIsCenter?: boolean;
    blogs: Blog[];
}



const SectionAppNews: FC<SectionAppNewsProps> = ({
    heading,
    subHeading = "",
    className = "",
    headingIsCenter = false,
    blogs
}) => {

    const renderNews = (blogs: Blog[]) => {
        return blogs.map((blog, index) => <CardAppNews ratio="aspect-w-13 aspect-h-10" key={index} blog={blog} />)
    }


    return (
        <div className={`nc-SectionAppNews ${className}`}>
            <div className={`flex justify-between`}>
                <Heading desc={subHeading} isCenter={headingIsCenter}>
                    {heading}
                </Heading>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
                {renderNews(blogs)}
            </div>
        </div>
    );
}





export default SectionAppNews;
