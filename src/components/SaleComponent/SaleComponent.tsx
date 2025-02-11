import * as React from "react";

import { SaleCard, SalesCardProps } from "../SaleCard/SaleCard";
import { useGetOrderStatistic } from "@/react-query/statistics";
import { Restaurant } from "@/types";

export interface SalesSummaryProps {
  title: string;
  subtitle: string;
  className?: string;
  restaurantId: Restaurant["id"];
  // cards: SalesCardProps[];
}

export const SalesSummary: React.FC<SalesSummaryProps> = ({
  className,
  title,
  subtitle,
  restaurantId,
}) => {
  const { data } = useGetOrderStatistic(restaurantId);
  React.useEffect(() => {
    setSales([
      {
        icon: "/icons/sales.svg",
        amount: data?.totalPrice ?? "0",
        label: "This month sales",
        change: data?.totalPricePercentChange ?? "No data",
        changeColor: "text-orange-300",
      },
      {
        icon: "/icons/total.svg",
        amount: data?.totalQuantity ?? "0",
        label: "Delivered Order ",
        change: data?.totalQuantityPercentChange ?? "No data",
        changeColor: "text-emerald-200",
      },
      {
        icon: "/icons/product.svg",
        amount: data?.cancelQuantity ?? "0",
        label: " Canceled Order ",
        change: data?.cancelQuantityPercentChange ?? "No data",
        changeColor: "text-pink-200",
      },
      // {
      //   icon: "/icons/customer.svg",
      //   amount: "12",
      //   label: "New Customer",
      //   change: "+3% from yesterday",
      //   changeColor: "text-sky-500"
      // }
    ]);
  }, [data]);
  const [sales, setSales] = React.useState<any[]>([]);

  return (
    <section
      className={`flex flex-col px-3.5 py-5 rounded-xl bg-neutral-100 dark:bg-zinc-800 ${className}`}
      aria-labelledby="sales-title"
    >
      <div className="flex flex-col self-start">
        <h2
          id="sales-title"
          className="text-base font-semibold dark:text-white text-black"
        >
          {title}
        </h2>
        <p className="mt-1.5 text-base font-medium dark:text-neutral-400 text-neutral-800">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 items-start mt-5 font-medium max-md:max-w-full">
        {sales.map((card, index) => (
          <SaleCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};
