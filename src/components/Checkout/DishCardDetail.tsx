import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Checkbox } from "antd";
import Image from "next/image";
import Input from "@/components/Input/Input";
import {
  ArrowRightIcon,
  HeartIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

import { FC, ReactNode, useState, Fragment, MouseEventHandler } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Dish } from "@/types/dish";
import FoodFeaturedMedia from "../DishFeaturedMedia/FoodFeaturedMedia";
export interface DishOptionItem {
  key: string;
  value: string;
  price: number;
}

const toppingOptions: DishOptionItem[] = [
  { key: "peachy", value: "Peachy", price: 8000 },
  { key: "icecream", value: "Ice Cream", price: 9000 },
  { key: "milkfoam", value: "Milk Foam", price: 10000 },
];
interface Props {
  renderTrigger: (onClick: { onClick: Function }) => ReactNode;
  dish: Dish;
}
const DishCardDetail: FC<Props> = ({ renderTrigger, dish }) => {
  const [open, setOpen] = useState(false);
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

          <div className="fixed w-screen flex inset-0 items-center justify-center ">
            <Dialog.Panel className=" space-y-4 border bg-white max-w-lg w-2/4 rounded-xl overflow-hidden">
              <div className="overflow-auto h-[480px] bg-white">
                <div className="relative w-full h-60">
                  <FoodFeaturedMedia dish={dish} />
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex flex-col gap-3 border-b-6 p-6 sticky top-0 z-40 bg-white">
                    <Dialog.Title className="flex justify-between items-center font-semibold text-xl">
                      <div>{dish?.name}</div>
                      <div>{dish?.price}đ</div>
                    </Dialog.Title>
                    <div className="flex gap-3 text-sm items-center text-gray-500">
                      <div className="flex gap-1">
                        <HeartIcon className="w-5 h-5" />
                        <div>1</div>
                      </div>
                      <div className="flex gap-2">
                        <ShoppingCartIcon className="w-5 h-5" />
                        <div>10+ saled</div>
                      </div>
                    </div>
                    <Input
                      placeholder="Write message to restaurant"
                      type="text"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex flex-col gap-3 border-b-6 p-6">
                    <Combobox>
                      <div className="flex justify-start text-center text-sm ">
                        <h2 className="uppercase font-semibold text-gray-500 mr-3">
                          Adding Topings
                        </h2>
                        <h4> - Choose maximum 4</h4>
                      </div>
                      <Combobox.Options static className="">
                        <ul className="">
                          {toppingOptions.map((item) => (
                            <Combobox.Option
                              className="flex items-center gap-3  text-center"
                              key={item.key}
                              value={item.value}
                            >
                              <Checkbox></Checkbox>
                              <div className="text-sm flex items-center justify-between border-b py-4 flex-1">
                                <div>{item.value}</div>
                                <div className="text-gray-500">
                                  {item.price}đ
                                </div>
                              </div>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </Combobox.Options>
                    </Combobox>
                  </div>
                  <div className="flex flex-col gap-3 border-b-6 p-6">
                    <Combobox>
                      <div className="flex justify-start text-center text-sm ">
                        <h2 className="uppercase font-semibold text-gray-500 mr-3">
                          Adding Topings
                        </h2>
                        <h4> - Choose maximum 4</h4>
                      </div>
                      <Combobox.Options static className="">
                        <ul className="">
                          {toppingOptions.map((item) => (
                            <Combobox.Option
                              className="flex items-center gap-3  text-center"
                              key={item.key}
                              value={item.value}
                            >
                              <Checkbox></Checkbox>
                              <div className="text-sm flex items-center justify-between border-b py-4 flex-1">
                                <div>{item.value}</div>
                                <div className="text-gray-500">
                                  {item.price}đ
                                </div>
                              </div>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </Combobox.Options>
                    </Combobox>
                  </div>
                  <div className="flex flex-col gap-3 border-b-6 p-6">
                    <Combobox>
                      <div className="flex justify-start text-center text-sm ">
                        <h2 className="uppercase font-semibold text-gray-500 mr-3">
                          Adding Topings
                        </h2>
                        <h4> - Choose maximum 4</h4>
                      </div>
                      <Combobox.Options static className="">
                        <ul className="">
                          {toppingOptions.map((item) => (
                            <Combobox.Option
                              className="flex items-center gap-3  text-center"
                              key={item.key}
                              value={item.value}
                            >
                              <Checkbox></Checkbox>
                              <div className="text-sm flex items-center justify-between border-b py-4 flex-1">
                                <div>{item.value}</div>
                                <div className="text-gray-500">
                                  {item.price}đ
                                </div>
                              </div>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </Combobox.Options>
                    </Combobox>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 w-full">
                <button className="p-1 bg-gray-300  rounded-md">
                  <MinusIcon className="w-4 h-4" />
                </button>
                <div>1</div>
                <button className="p-1 bg-primary-500 text-white rounded-md">
                  <PlusIcon className="w-4 h-4" />
                </button>
                <ButtonPrimary className=" rounded-md flex-grow">
                  Add to cart - 15.000đ
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
