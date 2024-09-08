"use client";
import React, { useState, Fragment, useEffect, Dispatch, SetStateAction, useRef } from "react";
import NavMobile from "@/components/Navigation/NavMobile";
import { usePathname } from "next/navigation";
import { NewsCategoryNavItem } from "@/app/news/page";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
export interface NewsCategoriesBarProps {
  selectedTab: NewsCategoryNavItem;
  setSelectedTab: Dispatch<SetStateAction<NewsCategoryNavItem>>;
  data: NewsCategoryNavItem[];
}
const NewsCategoriesBar: React.FC<NewsCategoriesBarProps> = ({ selectedTab, data, setSelectedTab }) => {
  const [isVisable, setIsVisable] = useState(false);
  const pathname = usePathname();
  const { name, href } = selectedTab;
  const listboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listboxRef.current && !listboxRef.current.contains(event.target as Node)) {
        setIsVisable(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);
  const handleOpenMenu = () => setIsVisable(!isVisable);
  const handleCloseMenu = () => setIsVisable(false);
  return (
    <div className="w-full" ref={listboxRef}>
      <Listbox value={selectedTab} onChange={(item: NewsCategoryNavItem) => {
        setIsVisable(false);
        setSelectedTab(item);
      }}>
        <div className="relative w-full">
          <Listbox.Button onClick={handleOpenMenu} className="relative w-full cursor-pointer bg-white py-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-base sm:leading-6">
            <div className="container flex justify-between">
            <span className="text-primary-500">{isVisable ? "Categories" : selectedTab.name}</span>
            <span className="pointer-events-none flex items-center">
              {isVisable ? <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-400" /> : <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />}

            </span> 
            </div>
          
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-base">
              {data.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
          {/* <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <Listbox.Options
            className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-base"
          >
            {data.map((item) => (
              <Listbox.Option
                key={item.id}
                value={item}
                className="group relative cursor-default select-none py-3 pl-4 pr-9 text-gray-900 data-[focus]:bg-neutral-200 data-[focus]:text-white"
              >
                <div className="flex items-center">

                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold group-data-[selected]:text-primary-500">
                    {item.name}
                  </span>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
          </Transition> */}
      
      </Listbox>
    </div>

  );
};

export default NewsCategoriesBar;
