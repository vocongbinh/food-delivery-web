"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Order, OrderNFT, OrderStatus } from "@/types/order";
import { formatDate } from "@/utils/apiHelpers";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import { useMap } from "react-use";
import { AttributionControl } from "mapbox-gl";
import { attr, dateFormat } from "highcharts";
import Utils from "@/utils";
import NcImage from "../NcImage/NcImage";
import { useChangeOrderStatusMutation } from "@/react-query/orders";
import ButtonPrimary from "../Button/ButtonPrimary";
import Loading from "../Button/Loading";

interface AdminOrderCardProps {
  order: Order;
  onClick?: () => void;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onClick }) => {
  const { mutate: changeOrderStatus, isPending } =
    useChangeOrderStatusMutation();
  const [isAccept, setIsAccept] = useState(false);
  const getBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "#FFA500"; // Orange
      case OrderStatus.PROCESSING:
        return "#00BFFF"; // Deep Sky Blue
      case OrderStatus.CANCELED:
        return "#FF4500"; // Orange Red
      case OrderStatus.DELIVERING:
        return "#FFD700"; // Gold
      case OrderStatus.DELIVERED:
        return "#32CD32"; // Lime Green
      default:
        return "#FFA500"; // Default to black if status is unknown
    }
  };
  const [viewDetail, setViewDetail] = useState(false);
  return (
    <>
      <div
        className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setViewDetail(!viewDetail)}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
            {order.orderStatus ?? "PENDING"}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">
            {order.created_at || formatDate(new Date())}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
              {order.items && order.items.length > 0 && (
                <NcImage
                  containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                  src={Utils.getDishImages(order.items[0].dish)}
                  fill
                  sizes="80px"
                  alt="post"
                />
              )}{" "}
            </div>

            {order.items.length > 1 && (
              <div className="absolute -bottom-2 -right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-md">
                +{order.items.length - 1}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-700 font-medium mb-1">
              Order ID: <span className="text-red-700">{order.id}</span>
            </h3>
            {/* <p className="text-gray-600 text-sm mb-2">{dishes}</p> */}
            <p className="text-gray-900 font-medium">
              {Utils.formatCurrency(order.price)}
            </p>
          </div>
          {!viewDetail && (
            <div
              onClick={() => setViewDetail(!viewDetail)}
              className="text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          )}{" "}
        </div>
      </div>
      {viewDetail && (
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                    <div className="mx-4 ml-0"></div>
                    <NcImage
                      containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                      src={Utils.getDishImages(item.dish)}
                      fill
                      sizes="80px"
                      alt="post"
                    />
                    <div className="ms-4 flex-grow">
                      <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                        {item.quantity}X
                      </h2>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap max-w-sm overflow-clip">
                  <h2 className="inline-flex line-clamp-2 text-base font-semibold  dark:text-neutral-300 mb-3">
                    {item.dish.name}
                  </h2>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex flex-col items-end gap-3">
                    <span> {Utils.formatCurrency(item.dish.price)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {viewDetail &&
        order.orderStatus !== "CANCELED" &&
        order.orderStatus !== "DELIVERED" && (
          <div className="mr-0 w-full flex justify-end">
            <button
              disabled={isPending}
              onClick={() => {
                setIsAccept(true);
                changeOrderStatus(
                  {
                    orderId: order.id,
                    orderStatus: OrderStatus.DELIVERED,
                  },
                  {
                    onSettled: () => setIsAccept(false),
                  }
                );
              }}
              className="text-sm flex px-2 mx-2 bg-primary text-center hover:bg-gray-50 flex-shrink-0 font-normal rounded-xl border  py-2"
            >
              {isPending && isAccept && <Loading />}
              Accept
            </button>
            <button
              disabled={isPending}
              onClick={() => {
                changeOrderStatus({
                  orderId: order.id,
                  orderStatus: OrderStatus.CANCELED,
                });
              }}
              className="text-sm flex px-2 text-center hover:bg-gray-50 flex-shrink-0 font-normal rounded-xl border  py-2"
            >
              {isPending && !isAccept && <Loading />}
              Cancel
            </button>
          </div>
        )}
    </>
  );
};

export default AdminOrderCard;
