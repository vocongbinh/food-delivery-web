"use client"
import Button from '@/components/Button/Button';
import CustomMySlider from '@/components/CustomMySlider';
import FeaturedRanking from '@/components/FeaturedRanking/FeaturedRanking';
import Heading from '@/components/Heading/Heading'
// import TableCoins from '@/components/TableCoins/TableCoins';
// import TableRanking from '@/components/TableRanking/TableRanking';
import TabList, { TabValue } from '@/components/TabList/TabList';
import { Progress, Switch } from 'antd';
import { calc } from 'antd/es/theme/internal';
import { Setting4 } from 'iconsax-react';
import React, { useState } from 'react'
import bitcoinImg from "@/images/Bitcoin.png"
import Image from 'next/image';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
// import CoinChart from '@/components/CoinChart/CoinChart';
const colorsLevel = [
    "#F19D2A",
    "#F2DB34",
    "#89E477",
    "#28C686",
]
const ProgressItem = () => {
    return <div className='flex gap-2'>
        <Progress format={(percent) => `${percent}`} type='circle' strokeColor="yellow" size={40} percent={38} />
        <div>
            <p className='font-semibold text-sm'>Yesterday</p>
            <p className='text-sm text-neutral-500'>Fear</p>
        </div>
    </div>
}
const tabsValue: TabValue[] = [
    {
        title: "All"
    },
    {
        title: "Tab 1"
    },
    {
        title: "Tab 2"
    },
]

const RakingPage = () => {
    const [highlight, setHighlight] = useState<boolean>(true);
    const fearValue = 20;
    const getPositionProgress = (value: number) => {
        if (value <= 25) return value + "%";
        else if (value <= 50) return value + "% + 4px";
        else if (value <= 75) return value + "% + 8px";
        else if (value <= 100) return value + "% + 12px";
    }
    const getColorProgress = (value: number) => {
        if (value <= 25) return colorsLevel[0];
        else if (value <= 50) return colorsLevel[1];
        else if (value <= 75) return colorsLevel[2];
        else return colorsLevel[3];
    }

    return (
        <div className='container' style={{
            backgroundColor: "white!important"
        }}>
            <div className='py-10'>
                <div className='flex justify-between items-start'>
                    <Heading desc="This is a sentence about something important.">Cryptocurrency Prices by Market Cap</Heading>
                    <div className='flex gap-2 items-center '>
                        <span className='text-sm font-semibold'>Highlights</span>
                        <Switch checked={highlight} onChange={setHighlight} />
                    </div>
                </div>

                <div className='grid lg:grid-cols-3 gap-6'>
                    <div className='h-[250px] rounded-2xl p-4 border border-neutral-200 flex flex-col'>
                        <span className='flex gap-2 items-center md:text-lg text-base font-semibold pb-4'>
                            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 27.625C19.6484 27.625 23.9688 25.1641 26.3203 21.0625C28.6719 17.0156 28.6719 12.0391 26.3203 7.9375C23.9688 3.89062 19.6484 1.375 15 1.375C10.2969 1.375 5.97656 3.89062 3.625 7.9375C1.27344 12.0391 1.27344 17.0156 3.625 21.0625C5.97656 25.1641 10.2969 27.625 15 27.625ZM15 0.5C19.9766 0.5 24.5703 3.17969 27.0859 7.5C29.6016 11.875 29.6016 17.1797 27.0859 21.5C24.5703 25.875 19.9766 28.5 15 28.5C9.96875 28.5 5.375 25.875 2.85938 21.5C0.34375 17.1797 0.34375 11.875 2.85938 7.5C5.375 3.17969 9.96875 0.5 15 0.5ZM15.875 4.875C15.875 5.36719 15.4375 5.75 15 5.75C14.5078 5.75 14.125 5.36719 14.125 4.875C14.125 4.4375 14.5078 4 15 4C15.4375 4 15.875 4.4375 15.875 4.875ZM12.375 19.75C12.375 20.7344 12.8672 21.5547 13.6875 22.0469C14.4531 22.5391 15.4922 22.5391 16.3125 22.0469C17.0781 21.5547 17.625 20.7344 17.625 19.75C17.625 18.8203 17.0781 18 16.3125 17.5078C15.4922 17.0156 14.4531 17.0156 13.6875 17.5078C12.8672 18 12.375 18.8203 12.375 19.75ZM11.5 19.75C11.5 18.5469 12.1016 17.5078 13.0312 16.8516L8.4375 7.71875C8.32812 7.5 8.4375 7.22656 8.65625 7.11719C8.875 7.00781 9.14844 7.11719 9.25781 7.33594L13.7969 16.4688C14.1797 16.3594 14.5625 16.3047 14.9453 16.3047C16.9141 16.3047 18.4453 17.8359 18.4453 19.8047C18.4453 21.7188 16.9141 23.3047 14.9453 23.3047C13.0312 23.3047 11.4453 21.7188 11.4453 19.8047L11.5 19.75ZM22 7.5C22 7.99219 21.5625 8.375 21.125 8.375C20.6328 8.375 20.25 7.99219 20.25 7.5C20.25 7.0625 20.6328 6.625 21.125 6.625C21.5625 6.625 22 7.0625 22 7.5ZM23.75 12.75C24.1875 12.75 24.625 13.1875 24.625 13.625C24.625 14.1172 24.1875 14.5 23.75 14.5C23.2578 14.5 22.875 14.1172 22.875 13.625C22.875 13.1875 23.2578 12.75 23.75 12.75ZM7.125 13.625C7.125 14.1172 6.6875 14.5 6.25 14.5C5.75781 14.5 5.375 14.1172 5.375 13.625C5.375 13.1875 5.75781 12.75 6.25 12.75C6.6875 12.75 7.125 13.1875 7.125 13.625Z" fill="#9395A4" />
                            </svg>
                            Fear & Geer Index</span>
                        <div className='flex gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex-[3] h-full flex gap-2'>
                                    <Progress format={(percent) => `${percent}`} size={80} type="circle" strokeWidth={10} trailColor='gray-200' strokeColor={`${getColorProgress(fearValue)}`} percent={fearValue} />
                                    <div className='flex flex-1 flex-col'>
                                        <span className='font-semibold'>Fear</span>
                                        <span className='text-xs'>Market sentiment is very bearish, many assets may be undervalued.</span>
                                    </div>
                                </div>
                                <div className='flex gap-1 relative'>
                                    <span className={`absolute -translate-x-1/2 -translate-y-1/4 p-1 border-4 border-white rounded-full bg-${getColorProgress(fearValue)}`} style={{
                                        left: `calc(${getPositionProgress(fearValue)})`
                                    }}></span>
                                    {colorsLevel.map((color, index) => <div key={color} className={`py-1 flex-1 rounded-full`} style={{
                                        backgroundColor: `${color}`
                                    }}></div>)}
                                </div>
                            </div>

                            <div className='flex-[2] flex flex-col gap-2'>
                                <ProgressItem key={1} />
                                <ProgressItem key={2} />
                                <ProgressItem key={3} />
                            </div>
                        </div>

                    </div>
                    <FeaturedRanking />
                    <div className="p-4 h-[250px] overflow-hidden rounded-3xl flex flex-col border border-neutral-200">
                        <div className='flex justify-between items-center'>
                            <span className="font-semibold text-lg flex gap-3">
                                <Image src={bitcoinImg} alt="" width={28} height={28} />
                                Bitcoin Dominance
                            </span>
                            <span className='text-blue-600 text-lg font-semibold'>7D</span>
                        </div>

                        <div className='flex gap-2 mt-4'>
                            <div className='px-2 border border-[#87E8DE] text-sm bg-[#E6FFFB] text-[#13C2C2] rounded-sm'>54.20%</div>
                            <span className='text-green-500 flex gap-2 text-sm items-center'>1.15% <ArrowUpRightIcon className='w-4 h-4' /></span>
                        </div>
                        {/* <CoinChart id='bitcoin' range={7} opts={
                            {
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        type: 'linear' as const,
                                        position: 'right' as const,
                                    },
                                },
                            }
                        } /> */}
                    </div>
                </div>
                <div className='flex justify-between py-4'>
                    <TabList sizeClassName='px-4 py-2 text-sm' activeClassName='text-primary-500 bg-primary-100' className="bg-white" onClickTab={() => { }} tabValues={tabsValue} />
                    <Button className="flex rounded-xl border border-neutral-200" pattern="white" sizeClass="px-3">
                        <span className="text-base">Filter</span>
                        <Setting4 className="ms-3" size={24} color="#596780" />
                    </Button>
                </div>
                {/* <TableCoins perPage={50} /> */}
            </div>

        </div>
    )
}

export default RakingPage