"use client";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import {
  Order,
  OrderNFT,
  OrderStatus,
  orderStatusToString,
} from "@/types/order";
import { Breadcrumb, Rate } from "antd";
import React, { useMemo, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi } from "@/apis/orders";
import Spinner from "@/components/Spinner/Spinner";
import { lazy, Suspense } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { parse } from "date-fns";
import {
  useGetMyOrder,
  useGetOrdersOfRestaurantQuery,
} from "@/react-query/orders";
import CardMyOrderItem from "@/components/CardMyOrderItem/CardMyOrderItem";
import AdminOrderCard from "@/components/CardMyOrderItem/CardMyOrderItem";
import { RestaurantsApi } from "@/apis/restaurants";
import { Restaurant } from "@/types";
import Image from "next/image";
import { ReviewsApi } from "@/apis/reviews";

dayjs.extend(customParseFormat);
const CardOrderNFT = lazy(
  () => import("@/components/CardOrderNFT/CardOrderNFT")
);

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
interface CategoryOrder {
  name: string;
  value: OrderStatus | number;
}
const categories: CategoryOrder[] = [
  { name: "All", value: 0 },
  { name: "Pending", value: OrderStatus.PENDING },
  { name: "Processing", value: OrderStatus.PROCESSING },
  { name: "Canceled", value: OrderStatus.CANCELED },
  { name: "Delivered", value: OrderStatus.DELIVERED },
];
export default function MyOrdersDefault({
  params,
}: {
  params: { restaurantId: number };
}) {
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
  console.log(rangeValue);
  const [selectedOrderType, setSelectedOrderType] = useState<OrderStatus | 0>(
    0
  );
  const { data: restaurant, isLoading: isLoadRestaurant } = useQuery({
    queryKey: ["restaurants", params.restaurantId],
    queryFn: () => RestaurantsApi.getRestaurantById(params.restaurantId),
  });
  const [tabActive, setTabActive] = useState<CategoryOrder>(categories[0]);

  const { data: orders } = useGetOrdersOfRestaurantQuery(params.restaurantId);
  const filterOrders = (): Order[] | undefined => {
    if (selectedOrderType !== 0) {
      return orders?.filter(
        (item) =>
          item.orderStatus ==
          orderStatusToString(selectedOrderType as OrderStatus)
      );
    } else return orders;
  };
  const { data: reviews } = useQuery({
    queryKey: ["reviews", params.restaurantId],
    queryFn: () => ReviewsApi.getReviews(params.restaurantId),
  });
  const handleClickTab = (tab: CategoryOrder) => {
    setTabActive(tab);
    setSelectedOrderType(tab.value);
  };
  if (isLoadRestaurant) return <></>;
  else {
    const { name, description, imageUrl, rating } = restaurant as Restaurant;

    return (
      <>
        <div className="relative">
          <div className="container relative">
            <div className="flex flex-col justify-between mt-10">
              <div className="w-full aspect-w-3 aspect-h-1 flex-shrink-0 relative rounded-xl overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt=""
                  sizes="(max-width: 600px) 30vw, 40vw"
                  src={imageUrl}
                  unoptimized={true}
                />
              </div>
              <div className="mt-6">
                <h3 className="font-semibold md:text-2xl text-lg">{name}</h3>
                <p className="text-neutral-500 md:text-base text-sm py-2">
                  {description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="md:text-2xl text-lg font-semibold">
                    {rating}
                  </span>
                  <Rate defaultValue={rating} allowHalf disabled />
                  <span className="text-neutral-500 ">•</span>
                  <span className="text-neutral-500 md:text-base text-sm">
                    {reviews?.length || 0} Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-10 pb-20">
          <Breadcrumb
            items={[
              {
                title: "Admin",
              },
              {
                title: "Order management",
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
              {filterOrders()?.map((item, index) => (
                <Suspense key={index} fallback={<span>...</span>}>
                  <AdminOrderCard order={item} />
                </Suspense>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
