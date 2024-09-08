"use client"
import React, { FC } from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Global } from "@/data/singleTypes";
import { isJSDocLinkLike } from "typescript";
import { Route } from "next";
interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className = "flex" }) => {

  const { data, isLoading } = useCustomQuery<Global>(({
    key: "global", urlParamsObject: {
      populate:
      {
        header: {
          populate: {
            links: {
              populate: "*"
            }
          }
        }
      }
    }
  }))
  if (isLoading) return <></>;
  else {
    const globalData = data as Global;
    const navItems: NavItemType[] = globalData.header.links.map(link => ({
      id: link.id.toString(),
      name: link.label,
      href: link.href as Route
    }))
    return (
      <ul className={`nc-Navigation items-center ${className}`}>
        {navItems.map((item) => (
          <NavigationItem key={item.id} menuItem={item} />
        ))}
      </ul>
    );
  }

};

export default Navigation;
