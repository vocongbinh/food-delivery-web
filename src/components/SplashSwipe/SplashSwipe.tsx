"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { variants } from "@/utils/animationVariants";
import Link from "next/link";
import { Route } from "@/routers/types";
import Splash1 from "./Splash1";
import { Button, Steps } from 'antd';
import { GeneratedIdentifierFlags } from "typescript";
import Gender from "./Gender";
import { Agent } from "https";
import Age from "./Age";
import Height from "./Height";
import Weight from "./Weight";
import Activity from "./Activity";
import Goal from "./Goal";
import { useInformationContext } from "@/contexts/information/information-context";
import Overview from "./Overview";
import { AuthsApi } from "@/apis/auths";
export interface GallerySliderProps {
    className?: string;
    ratioClass?: string;
    href?: Route<string>;
    imageClass?: string;
    galleryClass?: string;
    navigation?: boolean;
}
const stepItems = [
    {
        title: "Gender",
    },
    {
        title: "Age",
    },

    {
        title: "Height",

    },
    {
        title: "Weight",

    },


    {
        title: "Activity",
    },
    {
        title: "Goal",
    },
]
export default function SplashSwipe({
    className = "relative z-10",
    ratioClass = "relative aspect-w-4 aspect-h-3",
    imageClass = "",
    galleryClass = "rounded-xl",
    href,
    navigation = true,
}: GallerySliderProps) {
    const [loaded, setLoaded] = useState(false);
    const [hideStep, setHideStep] = useState(false);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const { information } = useInformationContext()
    const images: React.ReactNode[] = [
        <Splash1 key={1} onClick={() => changePhotoId(index + 1)} />,
        <Gender key={2} />,
        <Age key={3} />,
        <Height key={4} />,
        <Weight key={5} />,
        <Activity key={6} />,
        <Goal key={7} />,
        <Overview key={8} />
    ];

    function changePhotoId(newVal: number) {
        if (newVal > index) {
            setDirection(1);
        } else {
            setDirection(-1);
        }
        setIndex(newVal);
    }

    let currentImage = images[index];

    return (<div className="flex flex-col gap-3">
        <MotionConfig
            transition={{
                x: { type: "tween", ease: "linear", duration: 0.3 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className={` group group/cardGallerySlider h-[540px] ${className}`}
            >
                {/* Main image */}
                <div className={`w-full overflow-hidden ${galleryClass}`}>
                    <div
                        className={`flex items-center justify-center ${ratioClass}`}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                layout
                                custom={direction}
                                variants={variants(300, 1)}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative w-full"
                            >
                                {currentImage}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                    {index > 0 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-4">
                        {index > 0 && index < images.length - 1 && <button onClick={() => changePhotoId(index - 1)} className="p-6 rounded-full bg-transparent hover:bg-neutral-100 transition-colors" >
                            <ChevronLeftIcon className="w-20 h-20 mx-auto" />
                        </button>}
                        {index < images.length - 1 && <button onClick={async () => {
                            if (index + 1 < images.length) {
                                changePhotoId(index + 1)
                            }
                            if (index + 1 == images.length - 1) {
                                setHideStep(true)
                                await AuthsApi.updateUser(information);
                            }
                        }} className="p-6 rounded-full bg-transparent hover:bg-neutral-100 transition-colors" >
                            <ChevronRightIcon className="w-20 h-20 mx-auto" />
                        </button>}
                    </div>}
                </div>

                <>
                    {/* Buttons */}
                    {/* {loaded && navigation && (
                        <div className="opacity-0 group-hover/cardGallerySlider:opacity-100 transition-opacity ">
                            {index > 0 && (
                                <button
                                    className="absolute w-8 h-8 start-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10"
                                    style={{ transform: "translate3d(0, 0, 0)" }}
                                    onClick={() => changePhotoId(index - 1)}
                                >
                                    <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
                                </button>
                            )}
                            {index + 1 < images.length && (
                                <button
                                    className="absolute w-8 h-8 end-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none z-10"
                                    style={{ transform: "translate3d(0, 0, 0)" }}
                                    onClick={() => changePhotoId(index + 1)}
                                >
                                    <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
                                </button>
                            )}
                        </div>
                    )} */}

                    {/* Bottom Nav bar */}
                    {/* <div className="flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5 rtl:space-x-reverse">
                        {images.map((_, i) => (
                            <button
                                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/60 "
                                    }`}
                                onClick={() => changePhotoId(i)}
                                key={i}
                            />
                        ))}
                    </div> */}
                </>
            </div>
        </MotionConfig>

        {(!hideStep && index > 0) && <Steps items={stepItems} current={index - 1} direction="horizontal" size="small" labelPlacement="vertical" responsive />}
    </div>)
}
