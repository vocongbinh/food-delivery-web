"use client";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Label from "@/components/Label/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { apiUploadImage } from "@/utils/api-request";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DiscountType,
  DiscountTypes,
  Voucher,
  VoucherRequest,
} from "@/types/voucher";
import { VoucherRequestSchema } from "@/schemas/discountSchema";
import {
  useAddVoucherMutation,
  useUpdateVoucherMutation,
} from "@/react-query/vouchers";
import { useRouter } from "next/navigation";

const VoucherDetailInfors = ({
  voucher,
  restaurantId,
}: {
  restaurantId: number;
  voucher?: Voucher;
}) => {
  const [image, setImage] = useState<any>(voucher?.image);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadImage, setUploadImage] = useState(false);

  const form = useForm<VoucherRequest>({
    resolver: zodResolver(VoucherRequestSchema),
    defaultValues: {
      name: voucher?.name ?? "",
      description: voucher?.description ?? "",
      image: voucher?.image ?? "",
      discountValue: voucher?.discountValue,
      discountType: voucher?.discountType ?? DiscountType.PERCENTAGE,
      couponCode: voucher?.couponCode,
      exchangeRate: voucher?.exchangeRate,
      maximumDiscountValue: voucher?.maximumDiscountValue,
      validFrom: voucher?.validFrom ? new Date(voucher?.validFrom) : new Date(),
      validTo: voucher?.validTo ? new Date(voucher?.validTo) : new Date(),
      restaurantId: restaurantId,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const updateVoucher = useUpdateVoucherMutation();
  const addVoucher = useAddVoucherMutation();
  const router = useRouter();
  const onSubmit = (data: VoucherRequest) => {
    console.log("call submit");
    setIsSubmitting(true);
    if (voucher) {
      updateVoucher.mutate(
        { ...data, id: voucher!.id },
        {
          onSuccess: () => {
            router.back();
            console.log("success");
          },
          onError: () => {
            console.log("error");
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } else {
      addVoucher.mutate(
        { ...data },
        {
          onSuccess: () => {
            router.back();
            console.log("success");
          },
          onError: () => {
            console.log("error");
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    }
    setIsSubmitting(false);
  };
  console.log(form.formState.errors);
  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <h1 className="gap-5 text-2xl pb-5 font-bold">
        {voucher ? `Update dish: ${voucher.name}` : "Add new voucher"}
      </h1>

      <form
        className="grid md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2">
          <Label>Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="col-span-2">
          <Label>Condition</Label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>
        <label className="block">
          <Label>Discount type</Label>
          <Select
            className="mt-1"
            value={form.watch("discountType") || ""}
            onChange={(e) =>
              form.setValue("discountType", e.target.value as DiscountType)
            }
          >
            {DiscountTypes.map((item) => (
              <option value={item.type} key={item.type}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
        <div>
          <Label>Discount value</Label>
          <Input
            type="number"
            {...register("discountValue", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.discountValue && (
            <p className="text-red-500 text-sm mt-2">
              {errors.discountValue.message}
            </p>
          )}
        </div>
        <div>
          <Label>Coupon code</Label>
          <Input type="text" {...register("couponCode")} />
          {errors.couponCode && (
            <p className="text-red-500 text-sm mt-2">
              {errors.couponCode.message}
            </p>
          )}
        </div>
        <div>
          <Label>Maximun discount value</Label>
          <Input
            type="number"
            {...register("maximumDiscountValue", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.maximumDiscountValue && (
            <p className="text-red-500 text-sm mt-2">
              {errors.maximumDiscountValue.message}
            </p>
          )}
        </div>
        <div>
          <Label>Exchange rate</Label>
          <Input
            type="number"
            {...register("exchangeRate", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.maximumDiscountValue && (
            <p className="text-red-500 text-sm mt-2">
              {errors.maximumDiscountValue.message}
            </p>
          )}
        </div>
        <div>
          <Label>Valid from date</Label>
          <Input type="date" {...register("validFrom")} />
          {errors.validFrom && (
            <p className="text-red-500 text-sm mt-2">
              {errors.validFrom.message}
            </p>
          )}
        </div>
        <div>
          <Label>Valid to date</Label>
          <Input type="date" {...register("validTo")} />
          {errors.validFrom && (
            <p className="text-red-500 text-sm mt-2">
              {errors.validFrom.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <Label>Discount image</Label>
          <div className="mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            {image && (
              <>
                <Image
                  alt="featured"
                  className="object-cover relative"
                  src={image}
                  sizes="(max-width: 600px) 200px, 200px"
                  width={200}
                  height={200}
                />
                <XCircleIcon
                  onClick={() => setImage(null)}
                  className="absolute right-0 cursor-pointer top-0 w-5 bg-white"
                />
              </>
            )}
            {!image && (
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      disabled={isUploadImage}
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        setUploadImage(true);
                        const file = e.target.files?.[0];
                        if (file) {
                          apiUploadImage(file, "dish")
                            .then((url) => {
                              const imageUrl =
                                process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                                "/" +
                                url;
                              setImage(imageUrl);
                              setValue("image", imageUrl);
                            })
                            .catch((err) => console.log(err))
                            .finally(() => {
                              setUploadImage(false);
                            });
                        }
                      }}
                    />
                  </label>
                  <p className="ps-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoucherDetailInfors;
