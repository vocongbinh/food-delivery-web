"use client";
import TextArea from "antd/es/input/TextArea";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Label from "@/components/Label/Label";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useState } from "react";

export interface FoodOption {
  name: string;
  type: FoodOptionType | null;
  items: FoodItem[];
  maxAllow: number;
}

export enum FoodOptionType {
  Required,
  Optional,
}

export interface FoodItem {
  name: string;
  price: string | null;
}

const FoodOption = () => {
  const [option, setOption] = useState<FoodOption>({
    name: "",
    type: null,
    items: [],
    maxAllow: 1,
  });

  const [currentItem, setCurrentItem] = useState<FoodItem>({
    name: "",
    price: null,
  });

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setOption({ ...option, name: value });
    } else if (name === "maxAllow") {
      setOption({ ...option, maxAllow: parseInt(value) });
    } else if (name === "type") {
      setOption({ ...option, type: parseInt(value) });
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const addItem = () => {
    if (
      currentItem.name &&
      currentItem.price &&
      Number(currentItem.price) > 0
    ) {
      setOption({ ...option, items: [...option.items, currentItem] });
      setCurrentItem({ name: "", price: "" }); // Reset current item
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Food Option:", option);
    // Here you can send `option` to your backend
  };

  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-2">
          <Label>Option name</Label>
          <Input
            type="text"
            name="name"
            value={option.name}
            onChange={handleOptionChange}
          />
        </div>
        <label className="block">
          <Label>Type</Label>
          <Select
            className="mt-1"
            name="type"
            value={option.type !== null ? option.type.toString() : ""}
            onChange={handleOptionChange}
          >
            <option value={FoodOptionType.Required}>Force to choose 1</option>
            <option value={FoodOptionType.Optional}>Allow choose many</option>
          </Select>
        </label>
        <label className="block">
          <Label>Max amount can choose</Label>
          <Input
            type="number"
            className="mt-1"
            name="maxAllow"
            value={option.maxAllow}
            onChange={handleOptionChange}
          />
        </label>
        <div className="col-span-2 flex justify-between items-center">
          <Label>Option item</Label>
        </div>
        {option.items.map((item) => (
          <>
            <div className="col-span-2 flex items-center gap-2">
              <div className="flex-grow grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Option name"
                  value={item.name}
                  readOnly
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Option price"
                  value={item.price ?? ""}
                  readOnly
                />
              </div>
              <button
                type="button"
                className="p-1 bg-gray-100 rounded-md"
                onClick={addItem}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
            </div>
          </>
        ))}
        <div className="col-span-2 flex items-center gap-2">
          <div className="flex-grow grid grid-cols-2 gap-2">
            <Input
              type="text"
              name="name"
              placeholder="Option name"
              value={currentItem.name}
              onChange={handleItemChange}
            />
            <Input
              type="number"
              name="price"
              placeholder="Option price"
              value={currentItem.price ?? ""}
              onChange={handleItemChange}
            />
          </div>
          <button
            type="button"
            className="p-1 bg-gray-100 rounded-md"
            onClick={addItem}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <ButtonPrimary type="submit">Submit</ButtonPrimary>
      </form>
    </div>
  );
};

export default FoodOption;
