"use client";
import Heading1 from "@/components/Heading/Heading1";
import { useState } from "react";
import bg from "../../../public/bg_image.png";
import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "@/apis/restaurants";
import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import FilterListBox from "@/components/FilterListBox/FilterListBox";
import { useAddressContext } from "@/contexts/address/address-context";
import { Flex, Spin } from "antd";
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
const distanceList = [
  { name: "Distance 5km", value: 5 },
  { name: "Distance 10km", value: 10 },
  { name: "Distance 15km", value: 15 },
];
const RestaurantsPage = () => {
  const { location } = useAddressContext();
  const [searchText, setSearchText] = useState<string>("");
  const [distance, setDistance] = useState<{ name: string; value: number }>(
    distanceList[0]
  );
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants", distance.value, searchText],
    queryFn: () =>
      RestaurantsApi.getRestaurantsByDistance(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          distance: distance.value,
          keyword: searchText
        }
      ),
  });
  console.log(restaurants);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const searchResult = (query: string) =>
    (restaurants || [])
      .map((restaurant, idx) => {
        const category = `${query}${idx}`;
        return {
          value: restaurant.name,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {restaurant.name}
              </span>
            </div>
          ),
        };
      });
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value: string) => {
    setSearchText(value);
  };
  return (
    <div
      className="py-20 lg:px-20 px-10"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex items-start justify-between">
        <Heading1
          isCenter={false}
          desc="Choose a restaurant and find the dish you need"
        >
          Restaurants
        </Heading1>


        <div className="flex items-center gap-2">
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete>
          <FilterListBox
            className="h-full"
            lists={distanceList}
            selected={distance}
            setSelected={setDistance}
          />
        </div>
      </div>
      {!restaurants && (
        <Flex align="center" gap="middle" className="justify-center">
          <Spin size="large" />
        </Flex>
      )}
      <div className={`grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3`}>
        {(restaurants || []).map((restaurant) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default RestaurantsPage;
