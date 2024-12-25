"use client";
import TextArea from "antd/es/input/TextArea";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Label from "@/components/Label/Label";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupOptionSchema } from "@/schemas/groupOptionSchema"; // Assuming Zod schema is updated accordingly
import {
  GroupOption,
  GroupOptionItemRequest,
  GroupOptionRequest,
} from "@/types/groupOption";

const FoodOption = ({
  groupOption,
  restaurantId,
  saveGroupOption,
}: {
  restaurantId: number;
  groupOption?: GroupOption;
  saveGroupOption: (dish: GroupOptionRequest) => void;
}) => {
  // Initialize form with default values or groupOption (if available)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GroupOptionRequest>({
    resolver: zodResolver(GroupOptionSchema),
    defaultValues: {
      name: groupOption?.name || "",
      minimum: groupOption?.minimum || 1,
      maximum: groupOption?.maximum || 1,
      isOptional: groupOption?.optional || false,
      optionItems:
        groupOption?.optionItems.map((item) => ({
          name: item.name,
          price: item.price,
        })) || [],
    },
  });

  const option = watch(); // Watch the entire form state
  const [currentItem, setCurrentItem] = useState<GroupOptionItemRequest>({
    name: "",
    price: 0,
  });

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === "price" ? parseFloat(value) : value.trim(),
    });
  };

  const addItem = () => {
    if (currentItem.name && currentItem.price > 1000) {
      const updatedItems = [...option.optionItems, currentItem];
      setValue("optionItems", updatedItems); // Update the form state with new items
      setCurrentItem({ name: "", price: 0 }); // Reset current item
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = option.optionItems.filter((_, i) => i !== index);
    setValue("optionItems", updatedItems); // Update the form state with removed item
  };

  const onSubmit = (data: GroupOptionRequest) => {
    saveGroupOption({
      ...data,
      restaurantId,
    });
  };

  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <form
        className="grid md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Option Name */}
        <div className="col-span-2">
          <Label>Option name</Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter option name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Optional */}
        <div className="col-span-2">
          <Label>Optional</Label>
          <Select
            className="mt-1"
            {...register("isOptional")}
            onChange={(e) => {
              setValue("isOptional", e.target.value === "true");
            }}
          >
            <option value="true">Optional</option>
            <option value="false">Required</option>
          </Select>
          {errors.isOptional && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.isOptional.message}
            </p>
          )}
        </div>

        {/* Min & Max */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div>
            <Label>Min amount</Label>
            <Input
              type="number"
              {...register("minimum", { valueAsNumber: true })}
              className="mt-1"
            />
            {errors.minimum && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.minimum.message}
              </p>
            )}
          </div>
          <div>
            <Label>Max amount</Label>
            <Input
              type="number"
              {...register("maximum", { valueAsNumber: true })}
              className="mt-1"
            />
            {errors.maximum && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.maximum.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 flex justify-between items-center">
          <Label>Option items</Label>
        </div>

        {/* Display added items */}
        {option.optionItems.map((item, index) => (
          <>
            <div key={index} className="col-span-2 flex items-center gap-2">
              <div className="flex-grow grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  value={item.name}
                  readOnly
                  placeholder="Option name"
                />
                <Input
                  type="number"
                  value={item.price}
                  readOnly
                  placeholder="Option price"
                />
              </div>
              <button
                type="button"
                className="p-1 bg-gray-100 rounded-md"
                onClick={() => removeItem(index)}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
            </div>{" "}
            {errors.optionItems && (
              <p className="text-red-500 mt-1 text-sm"></p>
            )}
          </>
        ))}

        {/* Add new item */}
        <div className="col-span-2 flex items-center gap-2">
          <div className="flex-grow grid grid-cols-2 gap-2">
            <Input
              type="text"
              name="name"
              value={currentItem.name}
              onChange={handleItemChange}
              placeholder="Option name"
            />
            <Input
              type="number"
              name="price"
              value={currentItem.price ?? ""}
              onChange={handleItemChange}
              placeholder="Option price"
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
        {errors.optionItems && (
          <p className="text-red-500 mt-1 text-sm">
            {errors.optionItems.message
              ? errors.optionItems.message
              : "Option items is invalid"}
          </p>
        )}

        {/* Submit Button */}
        <ButtonPrimary className="col-span-2" type="submit">
          Submit
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default FoodOption;
