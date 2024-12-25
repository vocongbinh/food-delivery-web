"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DishCardDetail from "@/components/Checkout/DishCardDetail";
import Label from "@/components/Label/Label";
import NcImage from "@/components/NcImage/NcImage";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Checkbox, Radio } from "antd";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { useGetCartItemsQuery } from "@/react-query/carts";
import Utils from "@/utils";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { OrderRequestSchema } from "@/schemas/orderSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useAddOrderMutation } from "@/react-query/orders";
import { z } from "zod";
import { CartItem } from "@/types/cartItem";
import { useGetVoucherByRestaurant } from "@/react-query/vouchers";
import VoucherBox from "@/components/Checkout/VoucherBox";
import { DiscountType, Voucher } from "@/types";
import { useRouter } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const { data: cartItems } = useGetCartItemsQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createOrderMutation, isPending } = useAddOrderMutation();
  const router = useRouter();
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
    createOrderMutation(
      {
        ...data,
        cartItemIds: selectedItems?.map((item) => item.id) ?? [],
        voucherIds: [],
      },
      {
        onSuccess: (res) => {
          router.back();
        },
        onSettled: (res) => {},
      }
    );
    setIsSubmitting(false);
  };
  const [activeRestaurant, setActiveRestaurant] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { data: vouchers, refetch: refetchVoucher } =
    useGetVoucherByRestaurant(7);
  useEffect(() => {
    setSelectedItems(
      selectedItems.filter(
        (item) => item.dish.restaurant.id == activeRestaurant
      )
    );
    refetchVoucher();
  }, [activeRestaurant]);
  let total =
    restaurants.find((item) => item.id == activeRestaurant)?.total ?? 0;
  const getPaymentCard = () => {
    return (
      <div className=" rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 ">
        <div className="font-semibold w-full pb-4  block col-span-2">
          Payment information
        </div>
        <label className="block md:col-span-2 pb-2">
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
        <label className="block md:col-span-2 pb-2">
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
          <Select className="mt-1  w-full" placeholder="Select payment method">
            <option value="cash">Cash</option>
            <option value="zaloPay">Zalo pay</option>
          </Select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-2">
              {errors.paymentMethod.message}
            </p>
          )}
        </label>
        <div className=" border-neutral-200 dark:border-neutral-900 ">
          <dl>
            {restaurants
              .filter((item) => item.id == activeRestaurant)
              ?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={` px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 `}
                  >
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                      Subtotal
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 ">
                      {item.total}đ
                    </dd>
                  </div>
                );
              })}
            {selectedVoucher && (
              <div
                className={`${" dark:bg-neutral-900"}   px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4`}
              >
                <dt className="text-sm text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                  Discount
                </dt>
                <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200  sm:mt-0 ">
                  {selectedVoucher.discountType == DiscountType.FIXED_AMOUNT
                    ? selectedVoucher.discountValue
                    : (selectedVoucher.discountValue * total) / 100}
                  đ
                </dd>
              </div>
            )}{" "}
            <div
              className={`${" dark:bg-neutral-900"}  font-semibold p-1 sm:grid sm:grid-cols-3 sm:gap-4 `}
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
        <ButtonPrimary
          loading={isPending}
          disabled={isPending || selectedItems.length == 0}
          type="submit"
          className="w-full"
        >
          Order
        </ButtonPrimary>
      </div>
    );
  };
  const orderDetailCard = (restaurant: { id: number; name: string }) => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mt-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-3 lg:px-8">
          <div className="font-semibold w-full pb-2 border-b flex justify-start gap-2 items-center col-span-2 uppercase">
            <Radio.Group
              onChange={(val) => {
                // const newSelectedItems = selectedItems.filter(
                //   (x) => x.dish.restaurant.id == val.target.value
                // );
                // setSelectedItems(newSelectedItems);
                setActiveRestaurant(val.target.value);
              }}
              value={activeRestaurant}
            >
              <Radio value={restaurant.id}></Radio>
            </Radio.Group>
            <div className="font-semibold uppercase gap-2 ">
              {restaurant.name}
            </div>
            {/* <button
              type="button"
              className="text-sm font-normal rounded-xl border px-4 py-2"
            >
              Apply voucher
            </button> */}
          </div>
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
              {cartItems
                ?.filter((item) => item.dish.restaurant.id == restaurant.id)
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <div className="mx-4 ml-0">
                          <Checkbox
                            checked={selectedItems.some(
                              (x) => x.id === item.id
                            )}
                            onChange={(val) => {
                              if (activeRestaurant == item.dish.restaurant.id) {
                                if (
                                  selectedItems.some((x) => x.id === item.id)
                                ) {
                                  console.log("remove");
                                  const newSelectedItems = selectedItems.filter(
                                    (x) => x.id !== item.id
                                  );
                                  setSelectedItems(newSelectedItems);
                                } else {
                                  console.log("add");

                                  let newSelectedItems = [
                                    ...selectedItems,
                                    item,
                                  ];
                                  setSelectedItems(newSelectedItems);
                                }
                              } else {
                                console.log("new");

                                setSelectedItems([item]);
                                setActiveRestaurant(item.dish.restaurant.id);
                              }
                            }}
                            className="mx-1"
                          ></Checkbox>
                        </div>
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
          {activeRestaurant == restaurant.id && (
            <div className="grid grid-cols-3 gap-2">
              {vouchers?.map((item) => (
                <VoucherBox
                  selected={selectedVoucher?.id ?? 0}
                  onSelect={(voucher) => {
                    setSelectedVoucher(voucher);
                  }}
                  key={item.id}
                  voucher={item}
                />
              ))}
            </div>
          )}{" "}
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
          {restaurants.map((item) => orderDetailCard(item))}
        </div>
        <div className="w-2/5 p-2">{getPaymentCard()}</div>
      </div>
    </form>
  );
};

export default CheckoutPage;
