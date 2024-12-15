"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DishCardDetail from "@/components/Checkout/DishCardDetail";
import Label from "@/components/Label/Label";
import NcImage from "@/components/NcImage/NcImage";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Select } from "antd";
import Input from "@/components/Input/Input";
import { useGetCartItemsQuery } from "@/react-query/carts";
import Utils from "@/utils";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { OrderRequestSchema } from "@/schemas/orderSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useAddOrderMutation } from "@/react-query/orders";
import { z } from "zod";

const CheckoutPage: React.FC = () => {
  const { data: cartItems } = useGetCartItemsQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createOrderMutation = useAddOrderMutation();
  const restaurants = useMemo(
    () =>
      Array.from(
        new Set(
          cartItems?.map<{
            id: number;
            name: string;
            total: number;
          }>((item) => {
            let total = item.quantity * item.dish.price;
            return { ...item.dish.restaurant, total };
          })
        )
      ),
    [cartItems]
  );
  const form = useForm<z.infer<typeof OrderRequestSchema>>({
    resolver: zodResolver(OrderRequestSchema),
    defaultValues: {
      address: "",
      note: "",
      paymentMethod: "cash",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const onSubmit = (data: z.infer<typeof OrderRequestSchema>) => {
    setIsSubmitting(true);
    createOrderMutation.mutate(
      {
        ...data,
        cartItemIds: cartItems?.map((item) => item.id) ?? [],
        voucherIds: [],
      },
      {
        onSuccess: (res) => {},
        onSettled: (res) => {},
      }
    );
    setIsSubmitting(false);
  };

  const getAddressInformationForm = () => {
    return (
      <div className="bg-white rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
        <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
          <div className="font-semibold w-full pb-2 border-b block col-span-2">
            Address
          </div>
          <label className="block md:col-span-2">
            <Label>Address</Label>
            <Input
              placeholder="Type your address"
              type="text"
              className="mt-1"
              preIcon={<MapPinIcon className="w-5 h-5" />}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-2">
                {errors.address.message}
              </p>
            )}
          </label>
          <label className="block md:col-span-2">
            <Label>Note</Label>
            <Input
              placeholder="Ex: Please wait a minute"
              type="text"
              className="mt-1"
              {...register("note")}
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-2">{errors.note.message}</p>
            )}
          </label>
          <label className="block md:col-span-2">
            <Label>Payment method *</Label>
            <Select className="mt-1 w-full">
              <option value="cash">Cash</option>
              <option value="zaloPay">Zalo pay</option>
            </Select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-2">
                {errors.paymentMethod.message}
              </p>
            )}
          </label>
        </form>
      </div>
    );
  };
  const getPaymentCard = () => {
    return (
      <div className="bg-white rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 ">
        <div className="font-semibold w-full pb-2 border-b block col-span-2">
          Payment information
        </div>
        <div className="my-2 border-neutral-200 dark:border-neutral-900 ">
          <dl>
            {restaurants?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-neutral-50 dark:bg-neutral-800"
                      : "bg-white dark:bg-neutral-900"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 ">
                    {item.total}đ
                  </dd>
                </div>
              );
            })}
            <div
              className={`${"bg-white dark:bg-neutral-900"} border-t font-semibold px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm  text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                Total price
              </dt>
              <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200  sm:mt-0 ">
                {restaurants.reduce((acc, item) => acc + item.total, 0)}đ
              </dd>
            </div>
          </dl>
        </div>
        <ButtonPrimary type="submit" className="w-full">
          Order
        </ButtonPrimary>
      </div>
    );
  };
  const orderDetailCard = (restaurant: { id: number; name: string }) => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mt-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-3 lg:px-8">
          <div className="font-semibold w-full pb-2 border-b flex justify-between items-center col-span-2 uppercase">
            <div className="font-semibold  block  uppercase">
              {restaurant.name}
            </div>
            <button
              type="button"
              className="text-sm font-normal rounded-xl border px-4 py-2"
            >
              Apply voucher
            </button>
          </div>

          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
              {cartItems
                ?.filter((item) => item.dish.restaurant.id == restaurant.id)
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                          src={Utils.getDishImages(item.dish)}
                          fill
                          sizes="80px"
                          alt="post"
                        />
                        <div className="ms-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.quantity}X
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-sm overflow-clip">
                      <h2 className="inline-flex line-clamp-2 text-base font-semibold  dark:text-neutral-300 mb-3">
                        {item.dish.name}
                      </h2>
                      <DishCardDetail
                        dish={item.dish}
                        cartItem={item}
                        renderTrigger={({ onClick }) => (
                          <h4
                            onClick={() => onClick()}
                            className="text-sm text-blue-600 font-semibold cursor-pointer"
                          >
                            Edit food
                          </h4>
                        )}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex flex-col items-end gap-3">
                        <TrashIcon className="w-5 h-5 cursor-pointer" />
                        <span> {item.dish.price}</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold text-2xl w-full py-5 pl-20 border-b block col-span-2 bg-white">
        Check out your order
      </h1>
      <div className="flex px-10">
        <div className="w-3/5 p-2">
          {getAddressInformationForm()}
          {restaurants.map((item) => orderDetailCard(item))}
        </div>
        <div className="w-2/5 p-2">{getPaymentCard()}</div>
      </div>
    </form>
  );
};

export default CheckoutPage;
