"use client"
import Nav from '@/components/Nav/Nav'
import NavItem from '@/components/NavItem/NavItem'
import { OrderNFT, OrderStatus } from '@/types/order';
import { Breadcrumb } from 'antd'
import React, { useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';
import { OrdersApi } from '@/apis/orders';
import Spinner from '@/components/Spinner/Spinner';
import { lazy, Suspense } from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { parse } from "date-fns";

dayjs.extend(customParseFormat);
const CardOrderNFT = lazy(() =>
    import("@/components/CardOrderNFT/CardOrderNFT"));

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
interface CategoryOrder {
    name: string;
    value: OrderStatus | number;
}
const categories: CategoryOrder[] = [
    { name: 'All', value: 0 },
    { name: 'Pending', value: OrderStatus.PENDING },
    { name: 'Processing', value: OrderStatus.PROCESSING },
    { name: 'Delivering', value: OrderStatus.DELIVERING },
    { name: 'Delivered', value: OrderStatus.DELIVERED },
]
export default function MyOrders() {
    const [tabActive, setTabActive] = useState<CategoryOrder>(categories[0]);
    const currentDate = (new Date()).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    const [rangeValue, setRangeValue] = useState<[start: dayjs.Dayjs | null | undefined, end: dayjs.Dayjs | null | undefined]>([dayjs('09/09/2024', dateFormat), dayjs(currentDate, dateFormat)])
    const userFriendlyAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const { data, isLoading } = useQuery({ queryKey: ['order-nft'], queryFn: () => OrdersApi.retrieveOrderNFT(userFriendlyAddress), enabled: tonConnectUI.connected });
    const orderNFTs = useMemo(() => {
        const result = ((data || []) as OrderNFT[]).filter((order) => {
            console.log(order.attributes)
            const createdAt = order.attributes.find(e => e.trait_type == "Created At")?.value;
            console.log(createdAt)
            const createdAtDate = createdAt ? parse(createdAt as string, "MMMM d, yyyy", new Date()) : new Date();
            const createdFormatted = createdAtDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });
              console.log(createdFormatted);
            const date = dayjs(createdFormatted, dateFormat);
            console.log(date)
            console.log(rangeValue[0], rangeValue[1]);
            
            return rangeValue?.[0]?.isBefore(date) && rangeValue?.[1]?.isAfter(date);
        })
        return result
    },[data, rangeValue])
    console.log(rangeValue);
    const handleClickTab = (tab: CategoryOrder) => {
        setTabActive(tab);
    };

    return (
        <div className="container pt-10 pb-20">
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: 'My order',
                    },
                ]}
            />
            <div className="flex items-center justify-between">
                <Nav
                    className="sm:space-x-2 my-5 rtl:space-x-reverse"
                    containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                >
                    {categories.map((item, index) => (
                        <NavItem
                            key={index}
                            isActive={tabActive === item}
                            onClick={() => handleClickTab(item)}
                        >
                            {item.name}
                        </NavItem>
                    ))}
                </Nav>
                <RangePicker
                    value={rangeValue}
                    onChange={(dates, dateStrings) => setRangeValue(dates ?? [null, null])}
                    defaultValue={[dayjs('09/09/2024', dateFormat), dayjs('10/09/2024', dateFormat)]}
                    format={dateFormat}
                />
            </div>

            {isLoading ? <Spinner /> :
                <div className="flex flex-col gap-4">
                    {orderNFTs.map((order, index) =>
                        <Suspense key={index} fallback={<span>...</span>}>
                            <CardOrderNFT order={order} />
                        </Suspense>
                    )}
                </div>
            }



        </div>
    )
}
