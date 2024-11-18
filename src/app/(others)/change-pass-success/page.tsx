"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import React from "react";

const ChangePassSuccess = () => {
  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <CheckCircleIcon className="w-14 h-14 text-green-500" />
      <h2 className="font-semibold text-2xl text-center">Password changed</h2>
      <span className="text-sm text-center py-5">
        Your password has been successfully changed.
        <br />
        Please log in with the new password.{" "}
      </span>
      <Link className="w-full" href="/login">
        <ButtonPrimary className="w-full">Log In</ButtonPrimary>
      </Link>
    </div>
  );
};

export default ChangePassSuccess;
