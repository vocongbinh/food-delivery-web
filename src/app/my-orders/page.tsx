"use client"
import Nav from '@/components/Nav/Nav'
import NavItem from '@/components/NavItem/NavItem'
import { OrderNFT, OrderStatus } from '@/types/order';
import { Breadcrumb } from 'antd'
import React, { useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';
import { OrdersApi } from '@/apis/orders';
import Spinner from '@/components/Spinner/Spinner';
import CardOrderNFT from '@/components/CardOrderNFT/CardOrderNFT';
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
    const userFriendlyAddress = useTonAddress();
     const [tonConnectUI] = useTonConnectUI();
    
    const { data, isLoading } = useQuery({ queryKey: ['order-nft'], queryFn: () => OrdersApi.retrieveOrderNFT(userFriendlyAddress), enabled: tonConnectUI.connected });
    console.log(data);
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
            {isLoading ? <Spinner /> : 
            <div className="flex flex-col gap-4">
                {(data as OrderNFT[]).map((order, index) => <CardOrderNFT key={index} order={order} />)}
            </div>
            }
            


        </div>
    )
}
