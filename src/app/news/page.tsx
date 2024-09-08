"use client"
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import { FC, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Data, SearchNormal1 } from "iconsax-react";
import Heading from "@/components/Heading/Heading";
import MySlider from "@/components/MySlider";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Blog, NewsCategory } from "@/data/types";
import CardNews from "@/components/CardNews/CardNews";
import SectionNewsCategory from "@/components/SectionNewsCategory/SectionNewsCategory";
import NewsCategoriesBar from "@/components/NewsCategoriesBar/NewsCategoriesBar";
interface NewsPageProps {

}
export interface NewsCategoryNavItem {
    id: number;
    name: string;
    href: string;
}

const NewsPage: FC<NewsPageProps> = ({ }) => {
    const { data, isLoading } = useCustomQuery({
        key: "blogs"
    });
    const { data: newsCategories } = useCustomQuery<NewsCategory>({
        key: "news-categories"
    })
    if (isLoading) return <></>;
    else {
        const blogs = data as Blog[];
        return (<div className="relative">
            <div className="container relative py-10">
                <Heading desc="">Latest articles</Heading>
                <MySlider
                    data={blogs}
                    renderItem={(item, indx) => <CardNews key={indx} blog={item} />}
                    itemPerRow={4}
                />
                {(newsCategories as NewsCategory[] || []).map((item, index) => <SectionNewsCategory index={index} className="my-10" heading={item.name} key={index} blogs={item.blogs.data} />)}

            </div>
        </div>)
    }


}
export default NewsPage;