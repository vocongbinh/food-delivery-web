"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { Order, OrderNFT, OrderStatus } from "@/types/order";
import { formatDate } from "@/utils/apiHelpers";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import { useMap } from "react-use";
import { AttributionControl } from "mapbox-gl";
import { attr, dateFormat } from "highcharts";
import Utils from "@/utils";

interface CardMyOrderItemProps {
  order: Order;
  onClick?: () => void;
}

const CardMyOrderItem: React.FC<CardMyOrderItemProps> = ({
  order,
  onClick,
}) => {
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

  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
          {order.orderStatus ?? "Pending"}
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
              <Image
                src={order.items[0].dish.imageUrl ?? ""}
                alt="Order thumbnail"
                fill
                className="object-cover"
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

        <div className="text-gray-400">
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
      </div>
    </div>
  );
};

export default CardMyOrderItem;
