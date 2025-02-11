"use client";
import React, { FC, useEffect, useState } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import NotifyDropdown from "./NotifyDropdown";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import { useSession } from "next-auth/react";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { TonConnectButton } from "@tonconnect/ui-react";
import Link from "next/link";
import { Route } from "next";
import { useParams } from "next/navigation";
import { OWN_RESTAURANTS } from "@/contains/react_query_keys";
import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "@/apis/restaurants";
import LogoSvg from "../Logo/LogoSvg";
export interface AdminMainNav2LoggedProps {}

interface Location {
  latitude: number;
  longitude: number;
}

const AdminMainNav2Logged: FC<AdminMainNav2LoggedProps> = () => {
  const { token } = useAuthContext();
  const { data } = useSession();
  const session = data as any;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { restaurantId } = useParams();
  const { data: restaurants } = useQuery({
    queryKey: [OWN_RESTAURANTS],
    queryFn: () => RestaurantsApi.getOwnRestaurants(),
  });
  const [restaurantName, setRestaurantName] = useState("");
  useEffect(() => {
    setRestaurantName(
      restaurants?.find((item) => item.id == Number(restaurantId))?.name ??
        "Manage your restaurants"
    );
  }, [restaurantId]);
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center gap-4">
          <Link
            href="/admin/restaurant"
            className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
          >
            {/* THIS USE FOR MY MULTI DEMO */}
            {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
            <LogoSvg />
          </Link>
          <div>{restaurantName}</div>
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <div className="h-20 flex-shrink-0 flex items-center">
            <Link
              className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              href={
                `/admin/restaurant/${
                  restaurantId ? restaurantId : restaurants?.[0].id
                }/detail` as Route
              }
            >
              Information
            </Link>
            <Link
              className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              href={
                `/admin/restaurant/${
                  restaurantId ? restaurantId : restaurants?.[0].id
                }/statistic` as Route
              }
            >
              Statistic
            </Link>
            <Link
              className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              href={
                `/admin/restaurant/${
                  restaurantId ? restaurantId : restaurants?.[0].id
                }/order` as Route
              }
            >
              Orders
            </Link>
          </div>
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
          <TonConnectButton className="ml-4" />
        </div>
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
