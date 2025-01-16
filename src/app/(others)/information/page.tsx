"use client";
import React from "react";
import SplashSwipe from "@/components/SplashSwipe/SplashSwipe";
import InformationProvider from "@/contexts/information/information-context";


const InformationPage = ({ }) => {
  const splashClassName = "bg-gradient-to-r from-blue-200 via-white to-blue-200 p-8 rounded-lg shadow-md"

  return (
    <InformationProvider>
      <div className={`${splashClassName} mx-auto rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg dark:bg-neutral-900`}>
        <SplashSwipe />
      </div>
    </InformationProvider>

  );
};

export default InformationPage;
