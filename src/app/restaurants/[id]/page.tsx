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
export interface TabProps {
    id: number;
    name: string;
}
const tabs: TabProps[] = [
    {
        id: 0,
        name: "Category 1"
    },
    {
        id: 1,
        name: "Category 2"
    },
    {
        id: 2,
        name: "Category 3"
    }];
const RestaurantPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { mutate } = useCustomMutation({ key: "reviews", type: "create", queryKey: "applications" })
    const { data, isLoading } = useCustomQuery<Application>({
        key: "applications", id: Number(id)
    });
    const [tabActive, setTabActive] = useState<TabProps>(tabs[0]);

    const handleClickTab = (tab: TabProps) => {
        if (tab.id === tabActive.id) {
            return;
        }
        setTabActive(tab);
    };
    const handleSubmit = () => {
        const content = textareaRef.current?.value || "";
        const data: ReviewFormData = {
            content,
            author: 1,
            application: Number(id)
        }
        mutate({ data });
    }
    const renderDevelopers = useCallback((value: string) => {
        return value.split(',').map((item, index) => <li key={index} className="text-sm md:text-base">{item}</li>)
    }, []);
    const renderSocialNetworks = useCallback((networks: SocialComponent[]) => {
        return networks.map((item, index) => <button key={index} className="flex gap-2 items-center border border-neutral-200 bg-white px-3 py-2.5 rounded-full">
            <Image src={getStrapiMedia(item.logo.data.attributes.url) || ""} width={20} height={20} alt="" />
            <span className="text-sm text-neutral-500">{item.name}</span>
        </button>)
    }, [])



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
                            src="/bg_image.png"
                            unoptimized={true}
                        />
                    </div>
                    <div className="ml-10">
                        <h3 className="font-semibold md:text-2xl text-lg">name</h3>
                        <p className="text-neutral-500 md:text-base text-sm py-2">subTitle</p>
                        <div className="flex items-center gap-3">
                            <span className="md:text-2xl text-lg font-semibold">5.0</span>
                            <Rate
                                defaultValue={5}
                                allowHalf
                                disabled
                            />
                            <span className="text-neutral-500 ">•</span>
                            <span className="text-neutral-500 md:text-base text-sm">10 Reviews</span>
                        </div>
                    </div>


                </div>
                <Nav
                    className="sm:space-x-2 my-5 rtl:space-x-reverse"
                    containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                >
                    {tabs.map((item, index) => (
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

export default RestaurantPage;