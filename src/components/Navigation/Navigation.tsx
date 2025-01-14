"use client";
import React, { FC } from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
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
