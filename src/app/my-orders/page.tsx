"use client";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import { OrderNFT, OrderNFTStatus, OrderStatus } from "@/types/order";
import { Breadcrumb } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi } from "@/apis/orders";
import Spinner from "@/components/Spinner/Spinner";
import { lazy, Suspense } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { parse } from "date-fns";
import MyOrdersDefault from "../my-orders-default/page";
import { client } from "@/utils/jetton";
import { Address } from "ton-core";

dayjs.extend(customParseFormat);
const CardOrderNFT = lazy(
  () => import("@/components/CardOrderNFT/CardOrderNFT")
);

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
interface CategoryOrder {
  name: string;
  value: OrderNFTStatus | number;
}
const categories: CategoryOrder[] = [
  { name: "All", value: 0 },
  { name: "Pending", value: OrderNFTStatus.PENDING },
  { name: "Delivering", value: OrderNFTStatus.DELIVERING },
  { name: "Delivered", value: OrderNFTStatus.DELIVERED },
  { name: "Canceled", value: OrderStatus.CANCELED },

];
export default function MyOrders() {
  const [tabActive, setTabActive] = useState<CategoryOrder>(categories[0]);
  const [orderNFTs, setOrderNFTs] = useState<OrderNFT[]>([]);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [rangeValue, setRangeValue] = useState<
    [start: dayjs.Dayjs | null | undefined, end: dayjs.Dayjs | null | undefined]
  >([dayjs("09/09/2024", dateFormat), dayjs(currentDate, dateFormat)]);
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const { data, isLoading } = useQuery({
    queryKey: ["order-nft"],
    queryFn: () => OrdersApi.retrieveOrderNFT(userFriendlyAddress),
    enabled: tonConnectUI.connected,
  });
  useEffect(() => {
    console.log(tabActive)
    const getOrderNFTs = async () => {
      let result: OrderNFT[] = []
      if (data)
        for (let i = 0; i < data.length; i++) {
          const order = data[i] as OrderNFT
          const createdAt = order.attributes.find(
            (e) => e.trait_type == "Created At"
          )?.value;
          let status: OrderNFTStatus = OrderNFTStatus.PENDING
          const contractAddress = order.attributes.find(
            (e) => e.trait_type == "Contract Address"
          )?.value;
          if (!contractAddress) {
            status = OrderNFTStatus.PENDING
          }
          else {
            let { stack } = await client.callGetMethod(
              Address.parse(contractAddress as string),
              'get_order_info'
            );
            const statusNum = stack.skip(7).readNumber();
            switch (statusNum) {
              case 0:
                status = OrderNFTStatus.PENDING;
                break;
              case 1:
                status = OrderNFTStatus.DELIVERING;
                break;
              case 2:
                status = OrderNFTStatus.DELIVERED;
                break;
              case 3:
                status = OrderNFTStatus.CANCELED;
                break;
            }
          }
          const createdAtDate = createdAt
            ? parse(createdAt as string, "MMMM d, yyyy", new Date())
            : new Date();
          const createdFormatted = createdAtDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const date = dayjs(createdFormatted, dateFormat);
          if (rangeValue?.[0]?.isBefore(date) && rangeValue?.[1]?.isAfter(date) && status === tabActive.value as OrderNFTStatus) {
            result.push(order)
          }
        }
      setOrderNFTs(result);
    }
    getOrderNFTs()
  }, [data, rangeValue, tabActive]);

  const handleClickTab = (tab: CategoryOrder) => {
    setTabActive(tab);
  };

  return (
    <>
      <div className="container pt-10 pb-20">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Ton order",
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
            onChange={(dates, dateStrings) =>
              setRangeValue(dates ?? [null, null])
            }
            defaultValue={[
              dayjs("09/09/2024", dateFormat),
              dayjs("10/09/2024", dateFormat),
            ]}
            format={dateFormat}
          />
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4">
            {orderNFTs.map((order, index) => (
              <Suspense key={index} fallback={<span>...</span>}>
                <CardOrderNFT order={order} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
      <MyOrdersDefault />
    </>
  );
}
