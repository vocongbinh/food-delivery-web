"use client"
import { CategoriesApi } from "@/apis/categories";
import { DishTypesApi } from "@/apis/dish-types";
import { DishType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC } from "react";

export interface SidebarCategoryProps {
  className?: string;
  dishtypeId : number
}

const SidebarCategory: FC<SidebarCategoryProps> = ({ className = "", dishtypeId }) => {
  const {data, isLoading} = useQuery<DishType[]>({queryKey: ["dish-types", "overview"], queryFn: () => DishTypesApi.getDishTypesOverview()})
  
  return (
    <div className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold md:block none">By Category</h2>
        <div className="flex md:flex-col flex-row md:ml-4 ml-0 gap-4">
            {data &&  (data as DishType[]).map((item, index) => {
                return <div key={index} className="flex flex-row gap-2 items-center">
                    <div className="w-4 h-4 bg-primary-500"></div>
                    <Link href={`/categories/${item.id}`} className={` ${item.id == dishtypeId ? "": "hover:text-white"} cursor-pointer ${item.id == dishtypeId ? "text-primary-500": "text-black"} transition-colors duration-300`}>{item.name}</Link>
                </div>
            })}
        </div>
    </div>
  );
};

export default SidebarCategory;
