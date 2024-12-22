"use client"
import CardCategory from "@/components/CardCategory/CardCategory";
import Heading1 from "@/components/Heading/Heading1";
import { Category } from "@/data/types";
import { getPrefetchQuery } from "@/hooks/useCustomQuery";
import { FC } from "react";
import bg from "../../../public/bg_image.png";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { DishTypesApi } from "@/apis/dish-types";
import { DishType } from "@/types/dishType";
import { Flex, Spin } from "antd";

const CategoriesPage = () => {
    const { data: dishTypes, isLoading } = useQuery<DishType[]>({ queryKey: ["dish-types", "overview"], queryFn: () => DishTypesApi.getDishTypesOverview() });
    return <div className="py-20 lg:px-20 px-10" style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
    }}>
        <Heading1 isCenter={false} desc="Choose a category and find your favorite food!">Categories</Heading1>
        {isLoading ? <Flex align="center" gap="middle" className="justify-center">
            <Spin size="large" />
        </Flex> : <div className={`grid gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4`}>
            {(dishTypes || []).map((item, index) => {
                return <CardCategory index={index + 1} key={index} dishType={item} />;
            })}
        </div>}

    </div>
}
export default CategoriesPage;