"use client";
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { AuthRequest } from "@/types/auth";
import { useLogin } from "@/react-query/auth";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { toast } from "react-toastify";
const PageLogin = ({}) => {
  const { token, setToken } = useAuthContext();
  const router = useRouter();
  const { mutate: login, isPending: isSubmitting } = useLogin();
  const onSubmit = (data: AuthRequest) => {
    login(
      { ...data },
      {
        onSuccess: (res) => {
          setCookie("token", res.token);
          if (
            res.user_info.roles.find(
              (item) => item.role.name == "ROLE_SELLER"
            ) != null
          ) {
            window.location.href = "/admin/restaurant";
          } else {
            window.location.href = "/";
          }
        },
        onError: () => {
          toast.error("User credentials not valid");
        },
      }
    );
  };
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
      <header className="text-center max-w-2xl mx-auto - mb-3 sm:mb-16 lg:mb-6 ">
        <Heading2>Login</Heading2>
      </header>

      <div className="max-w-md mx-auto space-y-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
          action="#"
          method="post"
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <NcLink href="/forgot-pass" className="text-sm underline">
                Forgot password?
              </NcLink>
            </span>
            <Input
              type="password"
              placeholder="Password"
              className="mt-1"
              {...register("password")}
            />{" "}
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </label>
          <ButtonPrimary
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Continue
          </ButtonPrimary>
        </form>

        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <NcLink href="/signup">Create an account</NcLink>
        </span>
      </div>
    </div>
  );
};

export default PageLogin;
