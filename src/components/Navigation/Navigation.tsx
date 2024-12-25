"use client";
import React, { FC } from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Global } from "@/data/singleTypes";
import { isJSDocLinkLike } from "typescript";
import { Route } from "next";
interface Props {
  className?: string;
  navigations: NavItemType[];
}

const Navigation: FC<Props> = ({ className = "flex", navigations }) => {
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      {navigations.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
};

export default Navigation;
