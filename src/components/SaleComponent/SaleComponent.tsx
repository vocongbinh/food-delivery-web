import * as React from "react";

import { SaleCard, SalesCardProps } from "../SaleCard/SaleCard";

export interface SalesSummaryProps {
    title: string;
    subtitle: string;
    className?: string;
    // cards: SalesCardProps[];
  }
const salesData = [
  {
    icon: "/icons/sales.svg",
    amount: "$5k",
    label: "Total Sales",
    change: "+10% from yesterday",
    changeColor: "text-orange-300"
  },
  {
    icon: "/icons/total.svg",
    amount: "500",
    label: "Total Order",
    change: "+8% from yesterday",
    changeColor: "text-emerald-200"
  },
  {
    icon: "/icons/product.svg",
    amount: "9",
    label: "Product Sold",
    change: "+2% from yesterday",
    changeColor: "text-pink-200"
  },
  {
    icon: "/icons/customer.svg",
    amount: "12",
    label: "New Customer",
    change: "+3% from yesterday",
    changeColor: "text-sky-500"
  }
];

export const SalesSummary: React.FC<SalesSummaryProps> = ({
  className,
  title,
  subtitle
}) => {
  return (
    <section className={`flex flex-col px-3.5 py-5 rounded-xl bg-neutral-100 dark:bg-zinc-800 ${className}`} aria-labelledby="sales-title">
      <div className="flex flex-col self-start">
        <h2 id="sales-title" className="text-base font-semibold dark:text-white text-black">{title}</h2>
        <p className="mt-1.5 text-xs font-medium dark:text-neutral-400 text-neutral-800">{subtitle}</p>
      </div>
      <div className="flex gap-5 items-start mt-5 font-medium max-md:max-w-full">
        {salesData.map((card, index) => (
          <SaleCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};