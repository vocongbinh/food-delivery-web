"use client";

import React, { FC } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import musicWave from "@/images/musicWave.png";
import Link from "next/link";
import Image from "next/image";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Voucher } from "@/types/voucher";
import VoucherBadge from "./VoucherBadge/VoucherBadge";
import { formatDate } from "@/utils/apiHelpers";
import Button from "@mui/material/Button";
import DialogAlert from "../DialogAlert/DialogAlert";
import ButtonPrimary from "../Button/ButtonPrimary";
import { toast } from "react-toastify";
import DefaultVoucherImg from "@/images/default_voucher.jpg";
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import {
  prepareJettonTransfer,
  getJettonAddress,
  getJettonBalance,
} from "@/utils/jetton";
import { useTonConnect } from "../../../hooks/useTonConnect";
// import { connector } from "@/utils/tonConnectInstance";
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { VouchersApi } from "@/apis/vouchers";
export interface CardVoucherProps {
  className?: string;
  voucher: Voucher;
  ratio?: string;
  isExchanged: boolean;
}

const CardVoucher: FC<CardVoucherProps> = ({
  className = "h-full",
  voucher,
  ratio = "aspect-w-3 xl:aspect-w-4 aspect-h-3",
  isExchanged,
}) => {
  const {
    id,
    name,
    description,
    image,
    validFrom,
    validTo,
    couponCode,
    exchangeRate,
  } = voucher;
  const IS_AUDIO = false;
  const { sender, connected } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const exchangeVoucher = async (value: number) => {
    console.log(tonConnectUI.connected)
    if (!tonConnectUI.connected) {
      toast.error("Please connect your wallet first.");
      return;
    } else {
      // const rawAddress = connector.wallet!.account.address;
      // const userFriendlyAddress = toUserFriendlyAddress(rawAddress);
      console.log("userFriendlyAddress", userFriendlyAddress);
      const jettonWalletAddress = await getJettonAddress(userFriendlyAddress);
      const balance = await getJettonBalance(jettonWalletAddress);
      if (value > balance) {
        toast.error("Insufficient balance.");
        return;
      } else {
        const message = prepareJettonTransfer(
          jettonWalletAddress.toString(),
          "0QAY0-nximDrQIdBrH4r8RpJz9WtVANal49taOGX6u5LHXIH",
          1
        );
        console.log("message", message);
        await sender.send(message);
        await VouchersApi.receiveVoucher({ code: couponCode, productDiscountId: id });
      }
    }
  };
  console.log("isExchanged", voucher.couponCode, isExchanged);

  const renderListenButtonDefault = (state?: "playing") => {
    return (
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer`}
      >
        {state === "playing" ? (
          <PauseIcon className="w-8 h-8" />
        ) : (
          <PlayIcon className="ms-0.5 w-8 h-8 rtl:rotate-180" />
        )}
      </div>
    );
  };

  return (
    <div className={`nc-CardVoucher relative flex flex-col ${className}`}>
      <div
        className={`block flex-shrink-0 relative w-full rounded-3xl overflow-hidden ${ratio}`}
      >
        <Image
          fill
          alt=""
          sizes="(max-width: 600px) 480px, 800px"
          src={image || DefaultVoucherImg}
          className="object-cover"
        />
        <span className="bg-neutral-900 bg-opacity-30"></span>
      </div>

      {/* ABSOLUTE */}

      <span className="absolute top-3 inset-x-3">
        <VoucherBadge voucher={voucher} />
      </span>

      {/* MAIN CONTENT */}
      <div className="w-11/12 transform -mt-32 ">
        <div
          className={`px-5 flex items-center space-x-4 rtl:space-x-reverse ${
            !IS_AUDIO ? "relative opacity-0 z-[-1]" : ""
          }`}
        >
          <div className={`flex-grow `}>
            <Image src={musicWave} alt="musicWave" />
          </div>
          {/* <ButtonPlayMusicPlayer
            post={post}
            renderDefaultBtn={() => renderListenButtonDefault()}
            renderPlayingBtn={() => renderListenButtonDefault("playing")}
          /> */}
        </div>
        <div className="p-5 mt-5 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl rounded-3xl rounded-ss-none flex flex-col flex-grow ">
          <h2 className="nc-card-title block sm:text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-100 cursor-pointer">
            <h1 className="line-clamp-1" title={name}>
              {name}
            </h1>
          </h2>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400 my-3">
            <span className="line-clamp-2">{description}</span>
          </span>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            <span className="line-clamp-2 font-bold">CODE: {couponCode}</span>
          </span>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400  mb-5">
            <span className="line-clamp-2">
              <span className="text-primary">valid: </span>
              {formatDate(validFrom)} - {formatDate(validTo)}
            </span>
          </span>
          <div className="flex items-end justify-between mt-auto">
            <ButtonPrimary
              disabled={isExchanged}
              className={`${isExchanged ? "opacity-25" : "bg-primary-500"}`}
              onClick={async () => {
                exchangeVoucher(exchangeRate);
              }}
            >
              Exchange With {exchangeRate} DFT
            </ButtonPrimary>

            <DialogAlert isOpen={true}>
              <PostCardSaveAction className="relative" />
            </DialogAlert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVoucher;
