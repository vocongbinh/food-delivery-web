"use client";
import React, { FC, useEffect, useState } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/components/Navigation/Navigation";
import SearchModal from "./SearchModal";
import NotifyDropdown from "./NotifyDropdown";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import { getSession, useSession } from "next-auth/react";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { TonConnectButton } from "@tonconnect/ui-react";

export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const { token } = useAuthContext();
  const { data } = useSession();
  const session = data as any;


  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {(session && session.jwt) || token !== "" ? <>
            <NotifyDropdown />
            <AvatarDropdown />
          </> : <ButtonLogin />}
          {/* <SearchModal /> */}
          <TonConnectButton className="ml-4"/>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
