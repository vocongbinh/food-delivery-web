"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import React from "react";

const ChangePassSuccess = () => {
  return (
    <div className="px-6 py-6 flex flex-col gap-4 items-center bg-white rounded-2xl w-[80%] mx-auto">
      <CheckCircleIcon className="w-14 h-14 text-green-500" />
      <h2 className="font-semibold text-2xl text-center">Thank you for your order</h2>
      <span className="text-sm text-center py-5 text-neutral-500">
        The order confirmation with details of your order and link to track its progress has been sent to your email.
        <br />
        Continue Shopping.{" "}
      </span>
      
      <Link className="w-full" href="/">
        <ButtonPrimary className="w-full">Home</ButtonPrimary>
      </Link>
    </div>
  );
};

export default ChangePassSuccess;
