"use client"
import React, { useEffect } from 'react'
import RecommendSpinner from '../RecommendSpinner/RecommendSpinner'
import { useQuery } from '@tanstack/react-query';
import { DishesApi } from '@/apis/dishes';
import { AuthsApi } from '@/apis/auths';
import { ArrowDown } from 'iconsax-react';
import ButtonPrimary from '../Button/ButtonPrimary';
import { useRouter } from "next/navigation";
import { useInformationContext } from '@/contexts/information/information-context';
export default function Overview() {
    const router = useRouter()
    const { information } = useInformationContext()
    const { data: dishes, isLoading } = useQuery({
        queryKey: ["Recommend-dish"],
        queryFn: () => DishesApi.getRecommendedDishes(),
    });
    const { data, isLoading: conditionLoading } = useQuery({ queryKey: ["health-condition"], queryFn: () => AuthsApi.getUserCondition() })
    return (
        (!isLoading && !conditionLoading) ?   <div className="flex flex-col items-start gap-6">
        <span className='uppercase text-3xl font-semibold'>bmi calculator <br /> <span className='text-sm mt-2 font-normal capitalize'>Body Mass Index(BMI)</span></span>

        {!conditionLoading && <span className="text-2xl">{(data as any).bmi.toFixed(2)} kg/m²</span>}
        <span className="capitalize text-base">body weight categories: <span style={{ color: data?.color }} className="text-xl font-semibold">{data?.result}</span></span>
        <span className="text-sm text-neutral-400">Healthy BMI range: 18.5 kg/m² - 25 kg/m².</span>
        <span className='uppercase text-3xl font-semibold'>calories calculator <br />
            <span className="text-sm font-normal text-neutral-400 normal-case" >The results show a number of daily calorie estimates that can be used as a guideline for how many calories to consume each day to maintain, lose, or gain weight at a chosen rate.</span>

        </span>
        <div className="flex gap-2 items-center">
            {data?.calories.map((item, index) =>
            (<div key={index}>
                <h2 className='text-xs text-neutral-500'>{item.type}</h2>
                <h2>
                    {item.calo.toFixed(2)} Calories/day
                </h2>
                <span className='flex items-center gap-1 text-sm text-green-500'><ArrowDown /> {item.value}</span>
            </div>))}

        </div>
        <ButtonPrimary onClick={() => window.location.href="/"} className="self-center">Discover dishes that meet your needs. 👉👉</ButtonPrimary>
    </div>:
            <div className='h-full w-full flex items-center justify-center gap-4 flex-col'>
                <RecommendSpinner />
                <span className='text-xl mx-16 text-center'>We are calculating calories and providing the best choices for you...</span>
            </div> 
          
    )
}
