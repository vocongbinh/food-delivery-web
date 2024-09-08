"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import Link from "next/link";
import { Route } from "@/routers/types";
import { Advertisement, MediaData } from "@/data/types";
import { getStrapiMedia } from "@/utils/apiHelpers";
import ButtonPrimary from "../Button/ButtonPrimary";

export interface AdvertisementsSliderProps {
  className?: string;
  advertisements: Advertisement[];
  ratioClass?: string;
  href?: Route<string>;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
}

export default function AdvertisementsSlider({
  className = "relative z-10",
  advertisements,
  ratioClass = "relative aspect-w-4 aspect-h-3",
  imageClass = "",
  galleryClass = "rounded-xl",
  href,
  navigation = true,
}: AdvertisementsSliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = advertisements.map(ad => ad.featuredImage.data);

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images[index];
  let currentAdvertisement = advertisements[index];
  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className={` group group/cardAdvertisementsSlider ${className}`}
        {...handlers}
      >
        {/* Main image */}
        <div className={`w-full overflow-hidden ${galleryClass}`}>
          <Link
            href={href || "/"}
            className={`flex items-center justify-center ${ratioClass}`}
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
                <Image
                  src={images.length > 0 ? (getStrapiMedia(currentImage.attributes.url) || "") : ""}
                  fill
                  alt="listing card gallery"
                  className={`object-cover ${imageClass}`}
                  onLoad={() => setLoaded(true)}
                  sizes="(max-width: 1025px) 100vw, 300px"
                  unoptimized={true}
                />
              </motion.div>
            </AnimatePresence>
            <div className="flex w-1/2 h-full absolute left-0 top-0 items-center justify-center">
              <div className="flex flex-col gap-2 px-10">
                <span className="lg:text-4xl md:text-3xl text-2xl font-bold">{currentAdvertisement.name}</span>
                <span className="text-sm">{currentAdvertisement.description}</span>
                <ButtonPrimary className="xl:w-1/2 hidden md:block">Download Now</ButtonPrimary>
                <ButtonPrimary className="xl:w-1/2 block md:hidden">Explore Now</ButtonPrimary>
              </div>
            </div>
          </Link>
        </div>

        <>
          {/* Buttons */}
          {loaded && navigation && (
            <div className="opacity-0 group-hover/cardAdvertisementsSlider:opacity-100 transition-opacity ">
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
          )}

          {/* Bottom Nav bar */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-neutral-900 opacity-50 rounded-b-lg"></div>
          <div className="flex items-center justify-center absolute bottom-8 left-1/4 transform -translate-x-1/2 space-x-1.5 rtl:space-x-reverse">
            {images.map((_, i) => (
              <button
                className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/60 "
                  }`}
                onClick={() => changePhotoId(i)}
                key={i}
              />
            ))}
          </div>
        </>
      </div>
    </MotionConfig>
  );
}
