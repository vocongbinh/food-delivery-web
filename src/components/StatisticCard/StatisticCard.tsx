import { formatNumber } from '@/utils/convertNumbThousand'
import { ArrowDownCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'
import Image from 'next/image'
import React, { FC } from 'react'
export interface StatisticCardProps {
    title: string;
    value: number;
    changedValue: number;
    color?: string;
    icon:string;
}
const StatisticCard:FC<StatisticCardProps> = ({ title, value, changedValue, color, icon }) => {
    return (
        <div className="flex justify-between rounded-2xl p-2 border border-neutral-200">
            <div className="flex space-x-5">
                <div className="flex items-center" >
                    <div className={`p-3 bg-${color}-100 rounded-full`}>
                        <Image src={icon} width={20} height={20} alt=''/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm text-neutral-500">{title}</span>
                    <span className="text-lg font-semibold" >{value}</span>
                    <span className="text-sm text-red-500">{changedValue}%</span>
                </div>
            </div>

            <Tooltip title={"information"}>
                <InformationCircleIcon className="w-5 h-5" />
            </Tooltip>
        </div>
    )
}
export default StatisticCard