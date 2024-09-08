"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import Link from "next/link";
import { Route } from "@/routers/types";
import { Table } from "antd";
import { getStrapiMedia } from "@/utils/apiHelpers";

export interface RankingData {
    index: number;
    name: string;
    value: number;
}
export interface RankingSliderItem {
    title: string;
    icon: ReactNode;
    data: RankingData[];
}
export interface RankingSliderProps {
    className?: string;
    sliderData: RankingSliderItem[];
    ratioClass?: string;
    href?: Route<string>;
    imageClass?: string;
    galleryClass?: string;
    navigation?: boolean;
}

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
        render: (text:any, record:any, index:number) => index + 1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
    },
];
const data: RankingData[] = [
    {
        index: 0,
        name: "Bitcoin",
        value: 4.7
    },
    {
        index: 1,
        name: "Bitcoin",
        value: 4.7
    },
    {
        index: 2,
        name: "Bitcoin",
        value: 4.7
    }

]

export default function RankingSlider({
    className = "relative z-10",
    sliderData,
    ratioClass = "relative",
    imageClass = "",
    galleryClass = "rounded-xl",
    href,
    navigation = true,
}: RankingSliderProps) {
    const [loaded, setLoaded] = useState(false);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    function changeSliderId(newVal: number) {
        if (newVal > index) {
            setDirection(1);
        } else {
            setDirection(-1);
        }
        setIndex(newVal);
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < sliderData?.length - 1) {
                changeSliderId(index + 1);
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changeSliderId(index - 1);
            }
        },
        trackMouse: true,
    });

    let currentSlide = sliderData[index];

    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className={` group group/cardRankingSlider ${className}`}
                {...handlers}
            >
                {/* Main image */}
                <div className={`w-full overflow-hidden ${galleryClass}`}>
                    <div
                        className={`flex items-center justify-center ${ratioClass} h-[250px]`}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants(300, 1)}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <div className="p-4 rounded-3xl flex flex-col">
                                    <span className="font-semibold text-lg flex gap-3">{currentSlide.icon}{currentSlide.title}</span>
                                    <Table
                                        dataSource={currentSlide.data}
                                        columns={columns}
                                        showHeader={false}
                                        pagination={false} 
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <>
                    {/* Buttons */}
                     
                        <div className="opacity-0 group-hover/cardRankingSlider:opacity-100 transition-opacity ">
                            {index > 0 && (
                                <button
                                    className="absolute w-8 h-8 start-0 -translate-x-1/2 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10"
                                    onClick={() => changeSliderId(index - 1)}
                                >
                                    <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
                                </button>
                            )}
                            {index + 1 < sliderData.length && (
                                <button
                                    className="absolute w-8 h-8 translate-x-1/2 end-0 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10"
                                    
                                    onClick={() => changeSliderId(index + 1)}
                                >
                                    <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
                                </button>
                            )}
                        </div>
                    

                    {/* Bottom Nav bar */}
                    <div className="absolute bottom-0 inset-x-0 h-10 rounded-b-lg"></div>
                    <div className="flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5 rtl:space-x-reverse">
                        {sliderData.map((_, i) => (
                            <button
                                className={`w-2 h-2 rounded-full ${i === index ? "bg-primary-500" : "bg-gray-400 "
                                    }`}
                                onClick={() => changeSliderId(i)}
                                key={i}
                            />
                        ))}
                    </div>
                </>
            </div>
        </MotionConfig>
    );
}
