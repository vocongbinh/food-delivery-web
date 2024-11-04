'use client'

import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import SingleCommentLists from "@/app/(singles)/SingleCommentLists";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Media from "@/components/Media";
import MySlider from "@/components/MySlider";
import { Application, ReviewFormData } from "@/data/types";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { getStrapiMedia } from "@/utils/apiHelpers";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Rate, Tooltip } from "antd";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { User } from 'iconsax-react';
import SectionStatisticApp from "@/components/SectionStatisticApp/SectionStatisticApp";
import SectionAppNews from "@/components/SectionAppNews/SectionAppNews";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import SectionCharts from "@/components/SectionCharts/SectionCharts";
import { SocialComponent } from "@/data/components";
import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "@/apis/restaurants";
import { Restaurant } from "@/types/restaurant";
import { Category } from "@/types/category";


const RestaurantPage = ({params}: {params: {id: number}}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { mutate } = useCustomMutation({ key: "reviews", type: "create", queryKey: "applications" })
    const { data:restaurant, isLoading } = useQuery({queryKey: ["restaurants", params.id], queryFn: () => RestaurantsApi.getRestaurantById(params.id)})
    const [tabActive, setTabActive] = useState<Category>();
    const handleClickTab = (tab: Category) => {
        setTabActive(tab);
    };
    const handleSubmit = () => {
        const content = textareaRef.current?.value || "";
        const data: ReviewFormData = {
            content,
            author: 1,
            application: params.id
        }
        mutate({ data });
    }
   

    if(isLoading) return <></>
    else {
        const {name, description, imageUrl, rating, numReviews, categories} = restaurant as Restaurant;
        
        return (
            <div className="relative">
                <div className="container relative">
                    <div className="flex flex-col justify-between mt-10">
    
                        <div className="w-full aspect-w-3 aspect-h-1 flex-shrink-0 relative rounded-xl overflow-hidden">
                            <Image
                                fill
                                className="object-cover"
                                alt=""
                                sizes="(max-width: 600px) 30vw, 40vw"
                                src={imageUrl}
                                unoptimized={true}
                            />
                        </div>
                        <div className="mt-6">
                            <h3 className="font-semibold md:text-2xl text-lg">{name}</h3>
                            <p className="text-neutral-500 md:text-base text-sm py-2">{description}</p>
                            <div className="flex items-center gap-3">
                                <span className="md:text-2xl text-lg font-semibold">{rating}</span>
                                <Rate
                                    defaultValue={rating}
                                    allowHalf
                                    disabled
                                />
                                <span className="text-neutral-500 ">•</span>
                                <span className="text-neutral-500 md:text-base text-sm">{numReviews} Reviews</span>
                            </div>
                        </div>
    
    
                    </div>
                    <Nav
                        className="sm:space-x-2 my-5 rtl:space-x-reverse"
                        containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                    >
                        {categories.map((item, index) => (
                            <NavItem
                                key={index}
                                isActive={tabActive === item}
                                onClick={() => handleClickTab(item)}
                            >
                                {item.name}
                            </NavItem>
                        ))}
                    </Nav>
                    {/* {tabActive.id === 0 ? <>
                        <MySlider
                            className="py-10"
                            data={app.sliderImages.data || []}
                            renderItem={(item, indx) => <Media key={indx} data={item} />}
                            itemPerRow={3}
                        />
                        <div>
                            <div className="border-neutral-200 py-6">
                                <h3 className="font-semibold text-2xl">Description</h3>
                                <div className="text-sm py-3" >{app.description}</div>
                            </div>
                        </div>
                        <SectionStatisticApp className="p-6 bg-white rounded-3xl mb-10" />
                        <SectionCharts className="p-6 bg-white rounded-3xl mb-10" />
    
                        <div
                            id="comments"
                            className="scroll-mt-20 p-4 bg-white rounded-3xl"
                        >
                            <h3 className="text-xl font-semibold  text-center text-neutral-800 dark:text-neutral-200">
                                Reviews {reviews.length}
                            </h3>
                            <SingleCommentForm
                                textareaRef={textareaRef}
                                onClickSubmit={handleSubmit} />
                            <div className="max-w-screen-md py-10">
                                <SingleCommentLists reviews={reviews} />
                            </div>
                        </div>
                    </> : tabActive.id === 1 ? <SectionAppNews blogs={blogs} heading="News" /> : <div className="p-4 bg-white rounded-3xl"><BlocksRenderer content={app.updatedInformation || []} /></div>} */}
                    <div
                        id="comments"
                        className="scroll-mt-20 p-4 bg-white rounded-3xl"
                    >
                        <h3 className="text-xl font-semibold  text-center text-neutral-800 dark:text-neutral-200">
                            Reviews (10)
                        </h3>
                        <SingleCommentForm
                            textareaRef={textareaRef}
                            onClickSubmit={handleSubmit} />
                        <div className="max-w-screen-md py-10">
                            <SingleCommentLists reviews={[]} />
                        </div>
                    </div>
                </div>
            </div>);
    }

    
}

export default RestaurantPage;