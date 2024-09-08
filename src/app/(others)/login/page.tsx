"use client"
import React, { ReactNode, useState } from "react";
  import Login from "./login";
import SignUp from "./signUp";
interface TabItem {
  id: number;
  title: string;
  component: ReactNode;
}


const tabsValue: TabItem[] = [
  {
    id: 1,
    title: "Log In",
    component: <Login />
  },
  {
    id: 2,
    title: "Sign Up",
    component: <SignUp />
  }
]



const PageLogin = ({ }) => {
  const [activeTab, setActiveTab] = useState<TabItem>(tabsValue[0]);
  const handleChangeTab = (tab: TabItem) => {
    setActiveTab(tab);
  }
  return (
    <>
      {/* <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
        <Heading2>Login</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to our blog magazine Community
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={item.icon}
                alt={item.name}
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                {item.name}
              </h3>
            </a>
          ))}
        </div>
        {/* OR */}
      {/* FORM */}
      <div className="w-full flex">
        {tabsValue.map((tab, index) =>
          <div onClick={() => {
            handleChangeTab(tab);
          }} className={`text-center cursor-default transition-all duration-200 text-lg font-semibold flex-1 py-3 ${activeTab.id === tab.id ? "border-b-2 border-primary-500" : "text-neutral-200"}`}
            key={index}>{tab.title}</div>)}
      </div>
      {activeTab.component}
      {/* ==== */}


      {/* </div> */}
    </>
  );
};

export default PageLogin;
