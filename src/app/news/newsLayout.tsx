"use client"
import Nav from '@/components/Nav/Nav'
import NavItem from '@/components/NavItem/NavItem'
import NewsCategoriesBar from '@/components/NewsCategoriesBar/NewsCategoriesBar'
import { NewsCategory } from '@/data/types'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { Combobox } from '@headlessui/react'
import { SearchNormal1 } from 'iconsax-react'
import React, { useMemo, useState } from 'react'
import { NewsCategoryNavItem } from './page'

const NewsLayout = () => {
    const { data: newsCategories } = useCustomQuery<NewsCategory>({
        key: "news-categories"
    })
    let tabs: NewsCategoryNavItem[] = [{ id: 0, name: "All", href: "" }];

    let data = (newsCategories as NewsCategory[]).map<NewsCategoryNavItem>(category => ({
        id: category.id,
        name: category.name,
        href: category.href
    }))
    tabs = [...tabs, ...data]
    const [tabActive, setTabActive] = useState<NewsCategoryNavItem>(tabs[0]);
    
    const handleClickTab = (tab: NewsCategoryNavItem) => {
        if (tab.id === tabActive.id) {
            return;
        }
        setTabActive(tab);
    };
    return (
        <>
            <Nav
                className="sm:space-x-2 rtl:space-x-reverse"
                containerClassName="relative flex overflow-x-auto text-sm md:text-base lg:block hidden"
            >
                {tabs.map((item, index) => (
                    <NavItem
                        className="text-sm sm:text-base sm:py-3 capitalize py-2.5 sm:px-4 px-2"
                        key={index}
                        isActive={tabActive.id === item.id}
                        onClick={() => handleClickTab(item)}
                    >
                        {item.name}
                    </NavItem>
                ))}
            </Nav>
            <div className="flex items-center lg:hidden flex-1">
                <NewsCategoriesBar selectedTab={tabActive} data={tabs} setSelectedTab={setTabActive} />
            </div>
            <Combobox
            >
                <div className="relative bg-white rounded-full lg:my-0 my-4 max-lg:container border border-neutral-200">
                    <SearchNormal1
                        className="pointer-events-none absolute top-3.5 left-4 text-gray-400"
                        size={24}
                        aria-hidden="true"
                    />
                    <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search applications"
                        onChange={(event) => { }}
                    />
                </div>
            </Combobox></>
    )
}

export default NewsLayout