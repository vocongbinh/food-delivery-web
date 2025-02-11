import Image from "next/image";
import * as React from "react";

export interface SalesCardProps {
  icon: string;
  amount: string;
  label: string;
  change: string;
  changeColor: string;
}
export const SaleCard: React.FC<SalesCardProps> = ({
  icon,
  amount,
  label,
  change,
  changeColor,
}) => {
  return (
    <div className="flex flex-col rounded-none">
      <div className="flex flex-col justify-start items-start px-2.5 rounded-xl dark:bg-zinc-900 bg-white">
        <div className="flex flex-col p-2">
          <Image
            loading="lazy"
            src={icon}
            alt=""
            width={50}
            height={50}
            className="object-contain aspect-square w-[50px]"
          />
          <div className="flex flex-col mt-3">
            <div className="text-2xl font-semibold dark:text-white text-black">
              {amount}
            </div>
            <div className="mt-1.5 text-sx dark:text-gray-200" text-black>
              {label}
            </div>
            <div className={`mt-1.5 text-xl ${changeColor}`}>{change}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
