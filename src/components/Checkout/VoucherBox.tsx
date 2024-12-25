import React, { FC } from "react";
import { Voucher } from "@/types";
import { DEMO_AUTHORS } from "@/data/authors";
const authors = DEMO_AUTHORS.filter((_, i) => i < 12);
import Image from "next/image";

export interface VoucherBoxProps {
  className?: string;
  voucher: Voucher;
  selected: number;
  onSelect: (voucher: Voucher) => void;
}
import DefaultVoucherImg from "@/images/default_voucher.jpg";
import image from "next/image";
import { Radio } from "antd";

const VoucherBox: FC<VoucherBoxProps> = ({
  className = "",
  voucher,
  selected,
  onSelect,
}) => {
  const { displayName, href = "/", avatar, jobName, count } = authors[0];
  return (
    <div
      className={`nc-VoucherBox flex gap-2 border items-center justify-between text-center px-3 py-5 sm:px-2 sm:py-3 rounded-md bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="flex gap-2 w-full justify-start items-center">
        <div
          className={`block flex-shrink-0 relative rounded-md overflow-hidden w-10 h-10`}
        >
          <Image
            fill
            alt=""
            sizes="(max-width: 600px) 480px, 800px"
            src={voucher.image || DefaultVoucherImg}
            className="object-cover"
          />
          <span className="bg-neutral-900 bg-opacity-30"></span>
        </div>
        <div className=" flex flex-col justify-start items-start ">
          <div className={`text-xs  font-medium`}>{voucher.name}</div>
          <div
            className={`line-clamp-1 overflow-clip text-xs text-neutral-500 dark:text-neutral-400`}
          >
            {voucher.couponCode.toString()}
          </div>
        </div>
      </div>
      <div>
        <Radio.Group
          value={selected}
          onChange={(val) => {
            onSelect(voucher);
          }}
        >
          <Radio value={voucher.id}></Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default VoucherBox;
