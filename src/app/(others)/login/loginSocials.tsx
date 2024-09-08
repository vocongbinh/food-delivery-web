"use client"
import React from 'react'
import AppleSvg from "@/images/Apple.svg";
import GoogleSvg from "@/images/Google.svg";
import BinanceSvg from "@/images/Binance.svg";
import { signIn } from "next-auth/react";
const loginSocials = [
    {
        name: "Continue with Google",
        href: "/api/auth/signin",
        icon: <GoogleSvg />,
    },
    {
        name: "Continue with Apple",
        href: "#",
        icon: <AppleSvg />,
    },
    {
        name: "Continue with Binance",
        href: "#",
        icon: <BinanceSvg />,
    },
];
const LoginSocials = () => {
    return (
        <>
            <div className="relative text-center my-4">
                <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                    OR
                </span>
                <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            <div className="grid gap-3">
                {loginSocials.map((item, index) => (
                    // <a
                    //     key={index}
                    //     href={item.href}
                    //     className="flex space-x-3 justify-center items-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                    // >
                    <button
                        key={index}
                        className="flex space-x-3 justify-center items-center w-full rounded-lg bg-white dark:bg-neutral-800 px-4 py-3 border border-neutral-300 transform transition-transform sm:px-6 hover:translate-y-[-2px]"

                        onClick={(e) => {
                            // e.preventDefault();
                            signIn("google", {callbackUrl:"/login-success"});
                        }}>
                        <span className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                            {item.name}
                        </span>
                        {item.icon}
                    </button>


                    // </a>
                ))}
            </div></>
    )
}

export default LoginSocials