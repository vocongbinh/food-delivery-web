
import FulfilmentChart from '@/components/FulfilmentChart/FulfilmentChart'
import LevelChart from '@/components/LevelChart/LevelChart'
import { SalesSummary } from '@/components/SaleComponent/SaleComponent'
import { TopProducts } from '@/components/TopProducts/TopProducts'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import React from 'react'
import { Funnel } from 'recharts'

export default function StatisticPage() {
    return (
        <div className="container py-10 flex flex-col gap-4">
            <div className="flex gap-4 items-start">
                <SalesSummary
                    className="w-full self-stretch"
                    title="Today's Sales"
                    subtitle="Sales Summary"
                />
                <div className="flex flex-col w-[35%] py-5 items-start rounded-xl bg-neutral-100 dark:bg-zinc-800">
                    <h2 className="px-3 text-black dark:text-white text-lg font-semibold">Level</h2>
                    <div className='w-full h-[200px]'><LevelChart /></div>

                </div>
            </div>
            <div className="flex gap-4 items-start w-full">
                <TopProducts className='w-[65%] self-stretch' />
                <div className="flex flex-col w-full py-5 items-start rounded-xl bg-neutral-100 dark:bg-zinc-800">
                    <h2 className="px-3 text-black dark:text-white text-lg font-semibold">Level</h2>
                    <FulfilmentChart className='w-full h-[240px]' />
                </div>

            </div>


        </div>


    )
}
