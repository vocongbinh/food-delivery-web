import { PostDataType } from "@/data/types";
import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";
import { DiscountType, Voucher } from "@/types/voucher";

export interface VoucherBadgeProps {
  className?: string;
  itemClass?: string;
  voucher: Voucher;
}

const VoucherBadge: FC<VoucherBadgeProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  voucher,
}) => {
  const name =
    voucher.discountValue +
    " " +
    (voucher.discountType === DiscountType.PERCENTAGE ? "%" : "TON");
  return (
    <div className={`nc-VoucherBadge ${className}`} data-nc-id="VoucherBadge">
      <Badge className={itemClass} name={name} href={"/"} color={"red"} />
    </div>
  );
};

export default VoucherBadge;
