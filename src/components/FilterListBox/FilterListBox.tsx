"use client";

import React, { FC } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@/app/headlessui";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Button from "../Button/Button";

export interface FilterListBoxProps {
  className?: string;
  lists: { name: string, value: number }[];
  selected: { name: string, value: number };
  setSelected: (value: { name: string, value: number }) => void;
}

const FilterListBox: FC<FilterListBoxProps> = ({
  className = "",
  lists,
  selected,
  setSelected
  
}) => {
  // const [selected, setSelected] = useState(lists[0]);
  return (
    <div className={`nc-FilterListBox flex-shrink-0 ${className}`}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button as={"div"}>
            <button className="bg-neutral-200 rounded-xl flex py-2 px-4 sm:px-6 font-medium">
              {selected.name}
              <ChevronDownIcon
                className="w-4 h-4 ms-2 -me-1"
                aria-hidden="true"
              />
            </button>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
              {lists.map((item, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700"
                        : ""
                    } cursor-default select-none relative py-2 ps-10 pe-4`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="text-primary-700 absolute inset-y-0 start-0 flex items-center ps-3 dark:text-neutral-200">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterListBox;
