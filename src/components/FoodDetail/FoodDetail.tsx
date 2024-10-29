"use client";
import TextArea from "antd/es/input/TextArea";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Label from "@/components/Label/Label";
import { DishSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Category, Dish, DishRequest, DishType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  CATEGORY_KEY,
  DISH_KEY,
  DISH_TYPE_KEY,
} from "@/contains/react_query_keys";
import { DishTypesApi } from "@/apis/dishtypes";
import { CategoriesApi } from "@/apis/categories";
import Image from "next/image";
import { apiUploadImage } from "@/utils/api-request";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useAddDishMutation, useUpdateDishMutation } from "@/react-query/dishes";

const FoodDetailInfor = ({
  dish,
  restaurantId,
}: {
  restaurantId: number;
  dish?: Dish;
  saveDish: (dish: DishRequest) => void;
}) => {
  const [image, setImage] = useState<any>(dish?.imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadImage, setUploadImage] = useState(false);

  const onSubmit = (data: DishRequest) => {
    console.log("call submit");
    setIsSubmitting(true);
    if(dish){
      updateDish.mutate(
        { ...data, id: dish!.id },
        {
          onSuccess: () => {
            console.log("success");
          },
          onError: () => {
            console.log("error");
          },
          onSettled: () => {
            setIsSubmitting(false);
          }
        }
      );
    }
    else {
      addDish.mutate(
        { ...data },
        {
          onSuccess: () => {
            console.log("success");
          },
          onError: () => {
            console.log("error");
          },
          onSettled: () => {
            setIsSubmitting(false);
          }
        }
      );

    }
    setIsSubmitting(false);
  };
  const { data: dishTypes } = useQuery({
    queryKey: [DISH_TYPE_KEY],
    queryFn: () => DishTypesApi.getDishTypes(),
  });
  const { data: categories } = useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: () => CategoriesApi.getCategories(restaurantId),
  });
  const form = useForm<DishRequest>({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      name: dish?.name ?? "",
      description: dish?.description ?? "",
      imageUrl: dish?.imageUrl ?? "",
      price: dish?.price,
      categoryId: dish?.category?.id,
      dishTypeId: dish?.dishType?.id,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  console.log(errors);
  const updateDish = useUpdateDishMutation();
  const addDish = useAddDishMutation();

  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <form
        className="grid md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2">
          <Label>Food name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="col-span-2">
          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>
        <label className="block">
          <Label>Dish type</Label>
          <Select
            className="mt-1"
            value={form.watch("dishTypeId") || ""}
            onChange={(e) =>
              form.setValue("dishTypeId", Number(e.target.value))
            }
          >
            {dishTypes?.map((item: DishType) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="block">
          <Label>Category</Label>
          <Select
            className="mt-1"
            value={form.watch("categoryId") || ""}
            onChange={(e) =>
              form.setValue("categoryId", Number(e.target.value))
            }
          >
            {categories?.map((item: Category) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
        <div className="col-span-2">
          <Label>Food image</Label>
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
                              setValue("imageUrl", imageUrl);
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
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-2">
              {errors.imageUrl.message}
            </p>
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

export default FoodDetailInfor;
