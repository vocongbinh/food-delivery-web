"use client";
import React from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { RegisterRequest } from "@/types/auth";
import { useSignup } from "@/react-query/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const PageSignUp = ({}) => {
  const { mutate: signUp, isPending: isSubmitting } = useSignup();
  const router = useRouter();
  const onSubmit = (data: RegisterRequest) => {
    signUp(
      { ...data },
      {
        onSuccess: (res) => {
          toast.success("Register success!");
          router.push("/information");
        },
        onError: () => {
          toast.error("Error when sign up");
        },
      }
    );
  };
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      role: "ROLE_USER",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
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
          <span className="text-neutral-800 dark:text-neutral-200">
            Full name
          </span>
          <Input
            type="text"
            placeholder="Input your name"
            className="mt-1"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input {...register("password")} type="password" className="mt-1" />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
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

      {/* ==== */}
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        Already have an account? {` `}
        <NcLink href="/login">Sign in</NcLink>
      </span>
      {/* </div> */}
    </>
  );
};

export default PageSignUp;
