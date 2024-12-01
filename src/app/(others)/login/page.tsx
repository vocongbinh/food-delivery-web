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
const PageLogin = ({}) => {
  const { token } = useAuthContext();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useLogin();
  const onSubmit = (data: AuthRequest) => {
    setIsSubmitting(true);
    login.mutate(
      { ...data },
      {
        onSuccess: (res) => {
          setCookie("token", res.token);
          router.push("/");
        },
        onSettled: () => {
          setIsSubmitting(false);
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
    <>
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
          <ButtonPrimary disabled={isSubmitting} type="submit">
            Continue
          </ButtonPrimary>
        </form>

        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <NcLink href="/signup">Create an account</NcLink>
        </span>
      </div>
    </>
  );
};

export default PageLogin;
