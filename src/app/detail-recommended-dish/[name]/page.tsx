"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { RecommendedDish } from "@/types/recommendedDish";
import { render } from '@headlessui/react/dist/utils/render';
import StatisticComponent from '@/components/StatisticComponent/StatisticComponent';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
export default function DetailRecommendedDish({ params }: { params: { name: string } }) {
    const [recommendDish, setRecommendDish] = useState<RecommendedDish>();
    useEffect(() => {
        if (localStorage && localStorage.getItem("recommendedDishes")) {
            const recommendDishes: RecommendedDish[] = JSON.parse(localStorage.getItem("recommendedDishes") as string)
            setRecommendDish(recommendDishes.find(dish => dish.Name === decodeURIComponent(params.name)))
        }
    }, [localStorage])
    const renderGeneralInfo = (content: string | number, label: string, unit?: string) => {
        return (<div>
            <h2 className="text-sm text-neutral-500">{label}</h2>
            <div className="px-4 py-3 border-1 text-black border-neutral-400 rounded-xl items-center flex justify-between">
                <h2>{content}</h2>
                {unit && <h2 className="text-neutral-500">{unit}</h2>}
            </div>
        </div>)
    }
    const getTime = (duration: string) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = match![1] ? parseInt(match![1].replace("H", "")) : 0;
        const minutes = match![2] ? parseInt(match![2].replace("M", "")) : 0;
        return hours * 60 + minutes;
    }
    return (
        <div className="bg-neutral-100">
            <div className="container py-10 flex gap-6 items-stretch">
                <div className="flex-1">
                    <h1 className="uppercase text-neutral-500 text-lg text-left">general information</h1>
                    {recommendDish &&
                        <div className=" bg-white mt-4 rounded-2xl flex flex-col gap-4 p-6">
                            <div className="relative h-[200px]">
                                <Image src={recommendDish!.imageLink} alt="" layout="fill" objectFit="cover" className="rounded-2xl" />
                            </div>
                            <span>   <ButtonPrimary>Add To Cart</ButtonPrimary></span>

                            {renderGeneralInfo(recommendDish!.Name, "Name")}
                            {renderGeneralInfo(getTime(recommendDish!.CookTime), "Cook duration", "minutes")}
                            <div>
                                <h2 className="text-sm text-neutral-500">Overview</h2>
                                < StatisticComponent data={recommendDish} />/
                            </div>

                        </div>
                    }
                </div>

                <div className="flex-[2] flex flex-col gap-6">
                    <div>
                        <h1 className="uppercase text-neutral-500 text-lg text-left">recipe detail</h1>
                        <div className="bg-white mt-4 rounded-2xl flex flex-col gap-4 p-6">
                            <span className="text-sm text-neutral-500">Ingredients</span>
                            <div className="flex flex-wrap gap-4">
                                {recommendDish && recommendDish.RecipeIngredientParts.map((ingredient, index) =>
                                    <div key={index} className="px-4 text-sm py-3 text-black border-1 border-neutral-400 rounded-xl"><span className="m-auto">{ingredient}</span></div>)}
                            </div>

                        </div>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h1 className="uppercase text-neutral-500 text-lg text-left">directions</h1>
                        <div className="bg-white mt-4 rounded-2xl flex flex-col gap-4 p-6 flex-1">
                            <span className="text-sm text-neutral-500">Ingredients</span>
                            <div className="flex flex-col gap-2">
                                {recommendDish && recommendDish.RecipeInstructions.map((ingredient, index) =>
                                    <div className="flex gap-2 items-center" key={index}>
                                        <div className='w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center'><span className="m-auto">{index + 1}</span></div>
                                        <div key={index} className="px-4 w-full text-sm py-3 text-black border-1 border-neutral-400 rounded-xl">
                                            <span className="m-auto">{ingredient}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
