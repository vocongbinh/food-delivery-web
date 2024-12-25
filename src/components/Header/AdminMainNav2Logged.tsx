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
import { getCookie } from "cookies-next";
import { MapApi } from "@/apis/map";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useAddressContext } from "@/contexts/address/address-context";
import ModalChangeAddress from "../ModalChangeAddress/ModalChangeAddress";
import Button from "../Button/Button";
import ButtonPrimary from "../Button/ButtonPrimary";
import MapComponent from "../MapComponent/MapComponent";
import { ADMIN_NAVIGATION } from "@/data/navigation";
export interface AdminMainNav2LoggedProps {}

interface Location {
  latitude: number;
  longitude: number;
}

const AdminMainNav2Logged: FC<AdminMainNav2LoggedProps> = () => {
  const { token } = useAuthContext();
  const { data } = useSession();
  const session = data as any;
  const { address, setAddress, setLocation } = useAddressContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  React.useEffect(() => {
    // Function to get the user's location
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

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
                className=" cursor-pointer px-2 max-w-[300px] rounded-3xl border border-gray-400 flex gap-2 items-center"
              >
                <MapPinIcon className="w-7 h-7 text-primary-500" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                  {address}
                </span>
              </div>
            )}
            modalTitle="Change Address"
            renderContent={renderModalContent}
          />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation navigations={ADMIN_NAVIGATION} />
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
    <div className="nc-AdminMainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default AdminMainNav2Logged;
