import * as React from "react";
import Image from "next/image";
import { Progress } from "antd";
interface ProductRowProps {
  number: string;
  name: string;
  graphSrc: string;
  percentage: number;
  color: "orange" | "sky" | "pink" | "blue" | "gray";
}

export function ProductRow({
  number,
  name,
  graphSrc,
  percentage,
  color,
}: ProductRowProps) {
  const colorStyles = {
    orange: "text-orange-300 border-orange-300 bg-orange-300",
    sky: "text-sky-400 border-sky-400 bg-sky-400",
    pink: "text-pink-200 border-pink-200 bg-pink-200",
    blue: "text-blue-200 border-blue-200 bg-blue-200",
    gray: "text-gray-200 border-gray-200 bg-gray-200",
  };

  return (
    <div className="flex gap-5 justify-between items-center self-center mt-2 w-full text-xs font-medium dark:text-white text-black max-md:max-w-full">
      <div className="self-stretch my-auto text-sm w-[10%]">{number}</div>
      <div className="self-stretch my-auto w-[50%]">{name}</div>
      {/* <Image
        loading="lazy"
        src={graphSrc}
        alt={`Sales graph for ${name}`}
        className="object-contain shrink-0 self-stretch my-auto max-w-full rounded-none aspect-[166.67] w-[164px]"
      /> */}
      <Progress
        className="w-[50%]"
        percent={percentage}
        strokeColor={color}
        trailColor="#2B2B36"
        showInfo={false}
      />
      <div
        className={`px-2.5 py-1.5 whitespace-nowrap rounded border border-solid w-[20%] ${colorStyles[color]} bg-opacity-10`}
      >
        {percentage}%
      </div>
    </div>
  );
}
