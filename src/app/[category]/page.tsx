'use client'
import Button from "@/components/Button/Button";
import CardApplication from "@/components/CardApplication/CardApplication";
import { Application, Category, DataResponse } from "@/data/types";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import { Combobox } from "@headlessui/react";
import {SearchNormal1, Setting4} from 'iconsax-react'
import { usePathname } from "next/navigation";
const CategoryPage = () => {
    const pathname = usePathname();
    const { data, isLoading } = useCustomQuery<Category>({
        key: "categories", urlParamsObject: {
            filters: {
                href: {
                    $eq: pathname,
                },
            },
            populate: {
                applications: {
                    populate: {
                        logo: { fields: ["url"] }
                    }
                }
            }
        }
    });
    if (isLoading) {
        return <></>;
    }
    else {
        const category = (data as Category[])![0];
        const appData = category.applications.data as DataResponse<Application>[];
        const applications = retrieveDataFromResponse<Application>(appData);
        return (
            <div className="container py-20">
                <div className="py-10">
                    <div className="flex justify-between mb-10">
                        <span className={`text-2xl md:text-3xl lg:text-4xl font-semibold`}>
                            {category.name}
                        </span>
                        <div className="flex gap-4 w-1/2">
                            <Combobox
                            >
                                <div className="relative bg-white rounded-2xl flex-1">
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
                            </Combobox>
                            <Button className="flex rounded-xl" pattern="white" sizeClass="px-3">
                                <span className="text-base">Filter</span>
                                <Setting4 className="ms-3" size={24} color="#596780"/>
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm my-3 text-neutral-500 w-1/2">{category.description}</div>
                </div>
                <div className={`grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3`}>
                    {applications.map((item, index) => {
                        return <CardApplication key={index} app={item} />;
                    })}
                </div>
            </div>
        );
    }


}
export default CategoryPage;