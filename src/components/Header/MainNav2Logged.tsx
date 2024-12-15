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
import * as TonConnect from "@tonconnect/ui-react";
import { getCookie } from "cookies-next";
import { MapApi } from "@/apis/map";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useAddressContext } from "@/contexts/address/address-context";
import ModalChangeAddress from "../ModalChangeAddress/ModalChangeAddress";
import Button from "../Button/Button";
import ButtonPrimary from "../Button/ButtonPrimary";
import MapComponent from "../MapComponent/MapComponent";
import {Location} from 'iconsax-react'
import dynamic from 'next/dynamic';
export interface MainNav2LoggedProps {}

interface Location {
  latitude: number;
  longitude: number;
}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const { token } = useAuthContext();
  const { data } = useSession();
  const session = data as any;
  const { address, setAddress, setLocation } = useAddressContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const TonConnectButton = dynamic(() =>
      import('@tonconnect/ui-react').then((mod) => mod.TonConnectButton),
      { ssr: false }
    );
  React.useEffect(() => {
    // Function to get the user's location
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
           
            const address = await MapApi.getAddress(
              position.coords.longitude,
              position.coords.latitude
            );
            setAddress(address);
          },
          (error) => {}
        );
      }
    };

    // Request permission to access location when component mounts
    getLocation();
  }, []);
  const handleConfirm = () => {
    setIsOpen(false);
    setAddress(inputValue);
  };


  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center gap-4">
          <Logo />
          <ModalChangeAddress
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            renderTrigger={(openModal) => (
              <div
                onClick={openModal}
                className=" cursor-pointer px-4 max-w-[300px] rounded-3xl border border-gray-400 flex gap-2 items-center"
              >
                <Location size="32" color="#2b52ff"  variant="Bold"/>
                {/* <MapPinIcon className="w-10 h-10 text-primary-500" /> */}
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {address}
                </span>
              </div>
            )}
            modalTitle="Change Address"
            renderContent={renderModalContent}
          />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {(session && session.jwt) || token !== "" ? (
            <>
              <NotifyDropdown />
              <AvatarDropdown />
            </>
          ) : (
            <ButtonLogin />
          )}
          {/* <SearchModal /> */}
          <TonConnectButton className="ml-4" />
        </div>
      </div>
    );
  };
  const renderModalContent = () => {
    return (
      <div className="flex flex-col">
        <MapComponent inputValue={inputValue} setInputValue={setInputValue} />
        <ButtonPrimary onClick={handleConfirm} className="w-full mt-4">
          Confirm
        </ButtonPrimary>
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
