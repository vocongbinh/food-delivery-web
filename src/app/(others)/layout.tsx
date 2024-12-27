import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SplashSwipe from "@/components/SplashSwipe/SplashSwipe";
import { Splash } from "next/font/google";
import React, { FC, ReactNode } from "react";
import InformationPage from "./information/page";

const LayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-LayoutPage relative`}>
      <div
        className={`absolute h-full top-0 left-0 right-0 lg:w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      />
      <div className="relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28 lg:w-1/2 w-full mx-auto">
        {/* CONTENT */}
        {children}
      </div>

      {/* <div className="container pb-16 lg:pb-28">
        <SectionSubscribe2 />
      </div> */}
    </div>
  );
};

export default LayoutPage;
