import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Checkbox } from "antd";
import Input from "@/components/Input/Input";
import {
  ArrowRightIcon,
  HeartIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

import { FC, ReactNode, useState, Fragment, useEffect } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Dish } from "@/types/dish";
import FoodFeaturedMedia from "../DishFeaturedMedia/FoodFeaturedMedia";
import { useUpsertCartMutation } from "@/react-query/carts";
import { CartItem } from "@/types/cartItem";
import { useGetDishGroupOptionsQuery } from "@/react-query/options";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { useRouter } from "next/navigation";
import Utils from "@/utils";

export interface DishOptionItem {
  key: string;
  value: string;
  price: number;
}

interface Props {
  renderTrigger: (onClick: { onClick: Function }) => ReactNode;
  dish: Dish;
  cartItem?: CartItem;
}

const DishCardDetail: FC<Props> = ({ renderTrigger, dish, cartItem }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, []);
  const [isSubmiting, setIsSubmiting] = useState(false);

  // State to manage selected options for each group
  const [selectedGroupOptions, setSelectedGroupOptions] = useState<
    Record<number, number[]>
  >({});
  const router = useRouter();
  const { data: groupOptions } = useGetDishGroupOptionsQuery(dish.id);
  const upsertCartMutation = useUpsertCartMutation();
  const { userInfo } = useAuthContext();
  // Handle adding to the cart
  const handleUpsertCart = () => {
    if (userInfo == undefined) {
      router.push("/login");
    } else {
      setIsSubmiting(true);

      // Prepare the cartItemGroupOptionRequests based on selected options
      const cartItemGroupOptionRequests = Object.entries(
        selectedGroupOptions
      ).map(([groupOptionId, selectedOptions]) => ({
        groupOptionId: parseInt(groupOptionId), // Convert to number
        selectedOptions: selectedOptions,
      }));

      // Call the mutation to add to the cart
      upsertCartMutation.mutate(
        {
          quantity: quantity,
          cartItemGroupOptionRequests,
          dishId: dish.id,
        },
        {
          onSuccess: () => {
            setIsSubmiting(false);
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <>
      {renderTrigger({
        onClick: () => setOpen(true),
      })}

      <Transition.Root show={open} as={Fragment} appear>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="relative z-[100]"
        >
          <div className="fixed inset-0 bg-black/40 transition-opacity" />

          <div className="fixed w-screen flex inset-0 items-center justify-center">
            <Dialog.Panel className="space-y-4 border bg-white max-w-lg w-2/4 rounded-xl overflow-hidden">
              <div className="overflow-auto h-[480px] bg-white">
                <div className="relative w-full h-60">
                  <FoodFeaturedMedia dish={dish} />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 border-b-6 p-6 sticky top-0 z-40 bg-white">
                    <Dialog.Title className="flex justify-between items-center font-semibold text-xl">
                      <div>{dish?.name}</div>
                      <div>{Utils.formatCurrency(dish?.price)}</div>
                    </Dialog.Title>
                    <div className="flex gap-3 text-sm items-center text-gray-500">
                      <div className="flex gap-1">
                        <HeartIcon className="w-5 h-5" />
                        <div>1</div>
                      </div>
                      <div className="flex gap-2">
                        <ShoppingCartIcon className="w-5 h-5" />
                        <div>10+ sold</div>
                      </div>
                    </div>
                    <Input
                      placeholder="Write message to restaurant"
                      type="text"
                      className="mt-1"
                    />
                  </div>

                  {/* Group Options (Dynamic based on `groupOptions`) */}
                  {groupOptions?.map((item) => {
                    return (
                      <div
                        className="flex flex-col gap-3 border-b-6 p-6"
                        key={item.id}
                      >
                        <Combobox
                          value={selectedGroupOptions[item.id] || []}
                          // onChange={(selectedItems) => {
                          //   setSelectedGroupOptions((prev) => ({
                          //     ...prev,
                          //     [item.id]: selectedItems.map((selectedItem) => selectedItem.id),
                          //   }));
                          // }}
                        >
                          <div className="flex justify-start text-center text-sm">
                            <h2 className="uppercase font-semibold text-gray-500 mr-3">
                              {item.name}
                            </h2>
                            <h4>
                              {" "}
                              - Choose from {item.minimum} to {item.maximum}
                            </h4>
                          </div>
                          <Combobox.Options static className="">
                            <ul className="">
                              {item.optionItems.map((option) => (
                                <Combobox.Option
                                  key={option.id}
                                  value={option}
                                  className="flex items-center gap-3 text-center"
                                >
                                  <Checkbox
                                    checked={selectedGroupOptions[
                                      item.id
                                    ]?.includes(option.id)}
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      setSelectedGroupOptions((prev) => {
                                        const selectedOptions =
                                          prev[item.id] || [];
                                        const updatedOptions = isChecked
                                          ? [...selectedOptions, option.id]
                                          : selectedOptions.filter(
                                              (id) => id !== option.id
                                            );

                                        return {
                                          ...prev,
                                          [item.id]: updatedOptions,
                                        };
                                      });
                                    }}
                                  />
                                  <div className="text-sm flex items-center justify-between border-b py-4 flex-1">
                                    <div>{option.name}</div>
                                    <div className="text-gray-500">
                                      {option.price}đ
                                    </div>
                                  </div>
                                </Combobox.Option>
                              ))}
                            </ul>
                          </Combobox.Options>
                        </Combobox>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 w-full">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="p-1 bg-gray-300 rounded-md"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <div>{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 bg-primary-500 text-white rounded-md"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
                <ButtonPrimary
                  onClick={handleUpsertCart}
                  disabled={isSubmiting}
                  loading={isSubmiting}
                  className="rounded-md flex-grow"
                >
                  Add to cart - {dish?.price}
                </ButtonPrimary>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DishCardDetail;
