"use client";

import Input from "../Input/Input";
import Label from "@/components/Label/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../Button/ButtonPrimary";
import ModalChangeAddress from "../ModalChangeAddress/ModalChangeAddress";
import MapComponent from "../MapComponent/MapComponent";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { Restaurant } from "@/types";
import { apiUploadImage } from "@/utils/api-request";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import {
  useAddRestaurantMutation,
  useUpdateRestaurantMutation,
} from "@/react-query/restaurants";
const CategorySchema = z.object({
  name: z.string().min(1, "Option name is required"),
  dishQuantity: z.number().default(0),
});

const RestaurantSchema = z.object({
  name: z.string().nonempty("Restaurant name is required"),
  restaurantId: z.number(),
  imageUrl: z.string().nonempty("Restaurant name is required"),
  coverImageUrl: z.string().optional(),
  mainDish: z.string().optional(),
  ownerId: z.number(),
  address: z.string().nonempty("Address is required"),
  description: z.string().optional(),
  longtitude: z.string(),
  latitude: z.string(),
  locationId: z.string(),
  categories: z
    .array(CategorySchema)
    .min(1, "At least one option item is required"),
});

const RestaurantDetailInfor = ({ restaurant }: { restaurant?: Restaurant }) => {
  const router = useRouter();
  const [image, setImage] = useState<any>(restaurant?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: restaurant?.name || "",
      restaurantId: restaurant?.id || 0,
      imageUrl: restaurant?.imageUrl || "",
      coverImageUrl: restaurant?.coverImageUrl || "",
      mainDish: restaurant?.mainDish || "",
      ownerId: restaurant?.owner?.id || userInfo?.id,
      address: restaurant?.address || "",
      description: restaurant?.description || "",
      longtitude: restaurant?.longitude || "",
      latitude: restaurant?.latitude || "",
      locationId: restaurant?.locationId || "",
      categories:
        restaurant?.categories.map((item) => ({
          name: item.name,
          dishQuantity: item.dishQuantity,
        })) ?? [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const address = watch("address");
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadImage, setUploadImage] = useState(false);
  const updateRestaurant = useUpdateRestaurantMutation();
  const addRestaurant = useAddRestaurantMutation();

  const [currentItem, setCurrentItem] = useState<{
    name: string;
    dishQuantity: number;
  }>({ name: "", dishQuantity: 0 });

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    const { name } = currentItem;
    if (name) {
      setValue("categories", [...form.getValues("categories"), currentItem]);
      setCurrentItem({ name: "", dishQuantity: 0 });
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = form
      .getValues("categories")
      .filter((_, i) => i !== index);
    setValue("categories", updatedItems);
  };
  console.log(form.formState.errors);
  const onSubmit = (data: any) => {
    console.log("call submit");
    router.back();
    setIsSubmitting(true);
    if (restaurant) {
      updateRestaurant.mutate(
        { ...data, id: restaurant!.id },
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
      addRestaurant.mutate(
        { ...data },
        {
          onSuccess: () => {
            console.log("success");
            router.back();
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

  const renderModalContent = () => (
    <div className="flex flex-col">
      <MapComponent
        inputValue={address}
        setInputValue={(value: string) => setValue("address", value)}
        setLatitute={(value: string) => setValue("latitude", String(value))}
        setLongtitude={(value: string) => setValue("longtitude", String(value))}
        setLocationId={(value: string) => setValue("locationId", String(value))}
      />
      <ButtonPrimary onClick={() => setIsOpen(false)} className="w-full mt-4">
        Confirm
      </ButtonPrimary>
    </div>
  );

  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <h1 className="gap-5 text-2xl pb-5 font-bold">
        {restaurant
          ? `Update restaurant: ${restaurant.name}`
          : "Add new restaurant"}
      </h1>
      <form
        className="grid md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2">
          <Label>Restaurant Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="col-span-2">
          <Label>Address</Label>
          <ModalChangeAddress
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            renderTrigger={(openModal) => (
              <Input onClick={openModal} type="text" {...register("address")} />
            )}
            modalTitle="Change Address"
            renderContent={renderModalContent}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <Label>Main Dish</Label>
          <Input type="text" {...register("mainDish")} />
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <TextArea
            className="line-clamp-5 h-48 min-h-48"
            {...register("description")}
          />
        </div>
        <div className="col-span-2">
          <Label>Restaurant Image</Label>
          <div className="mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
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
                          apiUploadImage(file, "restaurant")
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
        </div>
        <Label className="col-span-2">Categories</Label>
        {watch("categories").map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 w-full">
            <Input
              type="text"
              value={item.name}
              readOnly
              disabled
              className="flex-1"
              placeholder="Category name"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 bg-gray-100 rounded-md"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <Input
            name="name"
            value={currentItem.name}
            onChange={handleItemChange}
            placeholder="Cateogry name"
          />
          <button
            type="button"
            onClick={addItem}
            className="p-1 bg-gray-100 rounded-md"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        {errors.categories && (
          <p className="text-red-500">{errors.categories.message}</p>
        )}
        <div className="col-span-2">
          <ButtonPrimary
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="w-full"
          >
            Submit
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default RestaurantDetailInfor;
