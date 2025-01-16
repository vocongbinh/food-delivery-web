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
import StripeElement from "@/components/StripeElement/StripeElement";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js/dist";
import CompletePage from "@/components/CompletePage/CompletePage";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { OrderContractItemRequest, OrderContractRequest } from "@/types/order";
import { MetaData, OrdersApi } from "@/apis/orders";
import { getTONPrice, prepareCreateOrderContractTransfer } from "@/utils/contract";
import { Address, toNano } from "ton-core";
import { useTonConnect } from "../../../../hooks/useTonConnect";
import { useTonAddress } from "@tonconnect/ui-react";
import { AuthsApi } from "@/apis/auths";
import { useQuery } from "@tanstack/react-query";
import { useAddressContext } from "@/contexts/address/address-context";
import SpinnerOverlay from "@/components/SpinnerOverlay/SpinnerOverlay";
import { isCallOrNewExpression } from "typescript";
const PaymentMethodEnum = {
  CASH: 1,
  STRIPE: 2,
  TON: 3,
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutPage: React.FC = () => {
  const { data: cartItems } = useGetCartItemsQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createOrderMutation, isPending } = useAddOrderMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const {address: addressOfContext} = useAddressContext()
  const walletAddress = useTonAddress(true);
  const {sender} = useTonConnect()
  const [tonLoading, setTonLoading] = useState(false);
  const { data: userProfile, isLoading } = useQuery({ queryKey: ["profile"], queryFn: () => AuthsApi.getUserProfile() })
  const router = useRouter();
  const { address } = useAddressContext();
  const restaurants = useMemo(
    () =>
      Array.from(
        new Set(
          cartItems?.map<{
            id: number;
            name: string;
            total: number;
          }>((item) => {
            let total =
              item.quantity * Math.round(item.dish.price / 1000) * 1000;
            return { ...item.dish.restaurant, total };
          })
        )
      ),
    [cartItems]
  );
  const form = useForm<z.infer<typeof OrderRequestSchema>>({
    resolver: zodResolver(OrderRequestSchema),
    defaultValues: {
      address: address ? address : "",
      note: "",
      phoneNumber: "",
      paymentMethod: PaymentMethodEnum.CASH,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  useEffect(() => {
    console.log(address);
    form.setValue("address", address);
  }, []);

  const paymentMethod = watch("paymentMethod");
  const handleTest = async () => {
    return fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt" }],
        amount: 50,
        destination: "acct_1QfeqOPGS9DAR4wx",
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };
  useEffect(() => {
    const isConfirmed = !!new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(isConfirmed);
    setIsConfirmed(isConfirmed);
    if (isConfirmed) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "xl-tshirt" }],
          amount: 50,
          destination: "acct_1QfeqOPGS9DAR4wx",
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);
  const options: StripeElementsOptions = {
    clientSecret,
  };

  useEffect(() => {
    if (Number(paymentMethod) == PaymentMethodEnum.STRIPE) {
      handleTest();
    }
  }, [paymentMethod]);
  const onSubmit = async(data: z.infer<typeof OrderRequestSchema>) => {
    setIsSubmitting(true);
    if (paymentMethod === PaymentMethodEnum.TON) {
     await handleCreateOrderContract({
        orderItems: selectedItems.map<OrderContractItemRequest>((item) => ({
          dish: {
            id: item.dish.id,
            name: item.dish.name,
            price: item.dish.price * item.quantity,
            description: item.dish.description,
            imageUrl: item.dish.imageUrl || "https://saodieu.vn/media/Bai%20Viet%20-%20T62016/Saodieu%20-%2010%20mon%20an%203.jpg"
          },
          quantity: item.quantity,
        })),
        vouchers: selectedVoucher ? [selectedVoucher] : [],
      });
    } else {
      createOrderMutation(
        {
          ...data,
          cartItemIds: selectedItems?.map((item) => item.id) ?? [],
          voucherIds: selectedVoucher ? [selectedVoucher.id] : [],
        },
        {
          onSuccess: (res) => {
            window.location.href = `/checkout-success`;
          },
          onSettled: (res) => { },
        }
      );
    }
    setIsSubmitting(false);
  };
  const handleCreateOrderContract = async (orderContract: OrderContractRequest) => {
    const data: MetaData = {
          address: addressOfContext,
          orderItems: orderContract.orderItems,
          name: userProfile?.username || "Default",
          phone: form.getValues("phoneNumber") || "0978754723",
        }
        const price = getTONPrice(data.orderItems[0].quantity * data.orderItems[0].dish.price)
        console.log(price)
        setTonLoading(true);
        const ownerAddress = "0QDREisYb3hWcNevBoAopiS2UubbDp174WF0_v2XSZd9gcwL"
        console.log(walletAddress)
        const {contract_address, order_id} = await OrdersApi.deployOrderContract({
          owner: ownerAddress,
          customer: walletAddress,
          name: data.orderItems[0].dish.name,
          image: data.orderItems[0].dish.imageUrl.split(", ")[0],
          quantity: data.orderItems[0].quantity,
          price: toNano(price),
        });
        
        const message = prepareCreateOrderContractTransfer(contract_address, {
          owner: Address.parse(ownerAddress),
          value: toNano(price)
        })
        await sender.send(message);
        await OrdersApi.deployNFT(data, walletAddress, order_id);
        setTonLoading(false);
  };
  const [activeRestaurant, setActiveRestaurant] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { data: vouchers, refetch: refetchVoucher } =
    useGetVoucherByRestaurant(activeRestaurant);
  useEffect(() => {
    setSelectedItems(
      selectedItems.filter(
        (item) => item.dish.restaurant.id == activeRestaurant
      )
    );
    refetchVoucher();
  }, [activeRestaurant]);
  const total = useMemo<{ total: number; discount: number }>(() => {
    const activeRestaurantTotal =
      restaurants.find((item) => item.id === activeRestaurant)?.total ?? 0;

    let discountValue = 0;

    if (selectedVoucher) {
      discountValue =
        selectedVoucher.discountType === DiscountType.FIXED_AMOUNT
          ? selectedVoucher.discountValue
          : (selectedVoucher.discountValue * activeRestaurantTotal) / 100;

      // Ensure discount doesn't exceed the total
      discountValue = Math.min(discountValue, activeRestaurantTotal);
    }

    return {
      total: activeRestaurantTotal - discountValue,
      discount: discountValue,
    };
  }, [activeRestaurant, selectedVoucher, restaurants]);
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
          <Label>Phone number</Label>
          <Input
            placeholder="Your phone number"
            type="text"
            className="mt-1"
            {...register("phoneNumber")}
          />
          {errors.note && (
            <p className="text-red-500 text-sm mt-2">
              {errors.phoneNumber?.message}
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
          <Select
            {...register("paymentMethod")}
            onChange={(e) =>
              form.setValue("paymentMethod", Number(e.target.value))
            }
            className="mt-1 w-full"
            placeholder="Select payment method"
          >
            <option key={PaymentMethodEnum.CASH} value={1}>
              Cash
            </option>
            <option key={PaymentMethodEnum.STRIPE} value={2}>
              Stripe Payment
            </option>
            <option key={PaymentMethodEnum.TON} value={3}>
              TON Wallet
            </option>
          </Select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-2">
              {errors.paymentMethod.message}
            </p>
          )}
        </label>

        {clientSecret && paymentMethod == PaymentMethodEnum.STRIPE && (
          <div className="my-5">
            <Elements options={options} stripe={stripePromise}>
              {isConfirmed ? (
                <CompletePage />
              ) : (
                <CheckoutForm>
                  <div className="w-full border-neutral-200 dark:border-neutral-900 my-4">
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
                              <dt className="mt-1 text-right text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 ">
                                {Utils.formatCurrency(item.total)}
                              </dt>
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
                          <dd className="text-right mt-1 text-sm text-neutral-900 dark:text-neutral-200  sm:mt-0 ">
                            {Utils.formatCurrency(total.discount)}
                          </dd>
                        </div>
                      )}{" "}
                      <div
                        className={`${" dark:bg-neutral-900"}  font-semibold p-1 sm:grid sm:grid-cols-3 sm:gap-4 `}
                      >
                        <dt className="text-sm  text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                          Total price
                        </dt>
                        <dd className="text-right mt-1 text-sm text-neutral-900 dark:text-neutral-200  sm:mt-0 ">
                          {paymentMethod == PaymentMethodEnum.TON? getTONPrice(total.total) + " TON" : Utils.formatCurrency(total.total)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </CheckoutForm>
              )}
            </Elements>
          </div>
        )}
        {paymentMethod !== PaymentMethodEnum.STRIPE && (
          <>
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
                          {Utils.formatCurrency(item.total)}
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
                      {Utils.formatCurrency(total.discount)}
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
                  {paymentMethod == PaymentMethodEnum.TON? getTONPrice(total.total) + " TON" : Utils.formatCurrency(total.total)}

                  </dd>
                </div>
              </dl>
            </div>
            <ButtonPrimary
              loading={isPending}
              disabled={isPending || selectedItems.length == 0}
              type="submit"
              className="w-full cursor-pointer mt-4"
              fontSize="text-sm"
            >
              Order
            </ButtonPrimary>
          </>
        )}
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
                        <span> {Utils.formatCurrency(item.dish.price)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {activeRestaurant == restaurant.id && (
            <div className="grid grid-cols-2 gap-2">
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
      {/* <SpinnerOverlay loading={tonLoading} /> */}
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
