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
        name: "Overview"
    },
    {
        id: 1,
        name: "News"
    },
    {
        id: 2,
        name: "Update about app"
    }];
const ApplicationPage = () => {
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
    if (isLoading) {
        return <></>;
    }
    else {
        const app = data as Application;
        const reviews = retrieveDataFromResponse(app.reviews ? app.reviews.data : []);
        const blogs = retrieveDataFromResponse(app.blogs ? app.blogs.data : []);
        const { developers, socialNetworks } = app
        return (
            <div className="relative">
                <div className="container relative">
                    <div className=" flex md:flex-row flex-col gap-8 py-8">
                        <div className="flex-[3]">
                            <div className="flex md:flex-row flex-col justify-between">
                                <div className="flex flex-row">
                                    <div className=" md:w-28 md:h-28 w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden">
                                        <Image
                                            fill
                                            className="object-cover"
                                            alt=""
                                            sizes="(max-width: 600px) 30vw, 40vw"
                                            src={getStrapiMedia(app.logo.data.attributes.url) || ""}
                                            unoptimized={true}
                                        />
                                    </div>
                                    <div className="ml-10">
                                        <h3 className="font-semibold md:text-2xl text-lg">{app.name}</h3>
                                        <p className="text-neutral-500 md:text-base text-sm py-2">{app.subTitle}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="md:text-2xl text-lg font-semibold">{app.rating}</span>
                                            <Rate
                                                defaultValue={app.rating}
                                                allowHalf
                                                disabled
                                            />
                                            <span className="text-neutral-500 ">•</span>
                                            <span className="text-neutral-500 md:text-base text-sm">{reviews.length} Reviews</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-20 md:w-auto w-full">
                                    <ButtonPrimary className="mt-8 w-full rounded-3xl">Open app</ButtonPrimary>
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
                            {tabActive.id === 0 ? <>
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
                            </> : tabActive.id === 1 ? <SectionAppNews blogs={blogs} heading="News" /> : <div className="p-4 bg-white rounded-3xl"><BlocksRenderer content={app.updatedInformation || []} /></div>}
                        </div>
                        <div className="flex-1">
                            <div className="p-8 bg-white rounded-2xl flex flex-col gap-8">
                                <span className="text-2xl font-semibold">Socials</span>
                                <div className="flex flex-wrap gap-2">
                                    {renderSocialNetworks(socialNetworks)}
                                </div>
                                <span className="text-2xl font-semibold flex gap-2 items-center"><User variant="Bold" size={16} color="#9395A4" />Team Member</span>
                                <ul className="list-disc mx-8">
                                    {renderDevelopers(developers)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
export default ApplicationPage;