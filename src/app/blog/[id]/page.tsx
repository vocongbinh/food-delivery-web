"use client"
import Media from "@/components/Media";
import { Blog } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { FC } from "react";
import Image from "next/image";
import { formatDate, getStrapiMedia } from "@/utils/apiHelpers";
import React from 'react'
import NewsCardMeta from "@/components/NewsCardMeta/NewsCardMeta";
import Button from "@/components/Button/Button";
import { ShareIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Heading from "@/components/Heading/Heading";


const BlogPage = ({ params }: { params: { id: number } }) => {
    const { data, isLoading } = useCustomQuery<Blog>({
        key: "blogs", id: params.id, urlParamsObject: {
            populate: "*"
        }
    });
    if (isLoading) {
        return <></>
    }
    else {
        const blog = data as Blog;
        const user = blog.createdBy.data;
        return <div>
            <div className="container bg-white py-10">
                <div className="md:px-60 px-20">
                    <span className="flex gap-2 items-center text-xs font-semibold">Home <ChevronRightIcon className="w-3 h-3" /> News <ChevronRightIcon className="w-3 h-3" />{blog.newsCategory.data.attributes.name} </span>
                    <h2 className="text-5xl font-bold mt-10 text-left">{blog.name}</h2>
                    <p className="font-semibold my-10">{blog.description}</p>

                    <div className="flex items-center justify-center mt-8 lg:mt-0">
                        <Image
                            src={getStrapiMedia(blog.featuredImage.data.attributes.url) || ""}
                            alt="none provided"
                            className="object-cover w-full h-full rounded-lg overflow-hidden"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="flex my-10 justify-between">
                        <NewsCardMeta meta={blog} />
                        <button className="rounded-full p-2 bg-neutral-200"><ShareIcon className="w-4 h-4" /></button>
                    </div>
                    <BlocksRenderer content={blog.content} />
                    <footer className="py-4 border-t border-b border-neutral-200 w-full flex my-10">
                        <div className="inline-flex gap-4 ml-auto">
                            <span className="text-sm font-semibold">Share this article</span>
                            <Image width={20} height={20} src="/icons/telegram.svg" alt="social" />
                            <Image width={20} height={20} src="/icons/facebook.svg" alt="social" />
                            <Image width={20} height={20} src="/icons/twitter.svg" alt="social" />
                            <Image width={20} height={20} src="/icons/in.svg" alt="social" />
                        </div>


                    </footer>

                </div>
            </div>
            <div className="container py-5 bg-\[\#f8f8f8\]">
                <Heading>Related Post</Heading>
            </div>
        </div>;

    }

}
export default BlogPage;
