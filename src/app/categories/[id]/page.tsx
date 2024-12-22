"use client";

import { DishTypesApi } from "@/apis/dishtypes";
import DishCard11 from "@/components/DishCard11/DishCard11";
import DishLoadingPlaceholder from "@/components/DishLoadingPlaceholder/DishLoadingPlaceholder";
import FilterListBox from "@/components/FilterListBox/FilterListBox";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import Spinner from "@/components/Spinner/Spinner";
import { DishClassification, DishType } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useState } from "react";

export interface TabProps {
    id: number;
    name: string;
    value: DishClassification
}

const navItems: TabProps[] = [
    {
        id: 1,
        name: "Related",
        value: DishClassification.RELATED
    },
    {
        id: 2,
        name: "Latest",
        value: DishClassification.LATEST
    },
    {
        id: 3,
        name: "Best Seller",
        value: DishClassification.BEST_SELLER
    }
]

const priceArranges = [
    { name: "Price", value: "default" },
    { name: "From low to high ", value: 'asc' },
    { name: "From high to low", value: 'desc' },
];
const CategoryPage = ({ params }: { params: { id: DishType["id"] } }) => {
    const [tabActive, setTabActive] = useState<TabProps | null>(navItems[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [priceArrange, setPriceArrange] = useState(priceArranges[0]);
    const handleClickTab = (tab: TabProps) => {
        setTabActive(tab);
        setPriceArrange(priceArranges[0]);
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const handlePreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1);
    }
    const renderPlaceHolder = () => {
        let i = 0;
        let arr = [];
        while (i < 10) {
            arr.push(<DishLoadingPlaceholder key={i} Imgstyle={{ width: '100%', height: '160px' }} inputStyle={{ width: '100%' }} />);
            i++;
        }
        return <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-3 xl:md:grid-cols-4">{arr}</div>
    }
    const { data: dishes, isLoading } = useQuery({
        queryKey: ["dish-types", "dish", params.id, currentPage, tabActive?.value, priceArrange.value],
        queryFn: () => DishTypesApi.getDishesOfDishType({id:params.id, page: currentPage, dishClassification: tabActive?.value, priceSort: priceArrange.value == "default"? undefined: priceArrange.value}),
    })
    return (
        <div className="container">
            <div className="flex gap-2 items-center">
                <Nav
                    className="sm:space-x-2 my-5 rtl:space-x-reverse"
                    containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                >
                    {navItems.map((item, index) => (
                        <NavItem
                            key={index}
                            isActive={tabActive === item}
                            onClick={() => handleClickTab(item)}
                        >
                            {item.name}
                        </NavItem>
                    ))}
                </Nav>
                <FilterListBox
                    className="h-full"
                    lists={priceArranges}
                    selected={priceArrange}
                    setSelected={setPriceArrange}
                    onChange={() => { setTabActive(null) }}
                />
                <div className="flex gap-2">
                    <Button onClick={handlePreviousPage} disabled={currentPage == 0}><ChevronLeftIcon className="w-5 h-5" /></Button>
                    <Button onClick={handleNextPage}><ChevronRightIcon className="w-5 h-5" /></Button>
                </div>
            </div>
            {isLoading ? renderPlaceHolder() :
                <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-3 xl:md:grid-cols-4">
                    {(dishes || []).map((dish, index) => (
                        <DishCard11 key={index} dish={dish} />
                    ))}</div>}

        </div>)
};

export default CategoryPage;
