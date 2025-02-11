"use client";
import Heading1 from "@/components/Heading/Heading1";
import bg from "../../../../public/bg_image.png";
import { useQuery } from "@tanstack/react-query";

import { RestaurantsApi } from "@/apis/restaurants";
import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { OWN_RESTAURANTS } from "@/contains/react_query_keys";
import Link from "next/link";
import { Route } from "next";

const RestaurantsPage = () => {
  const { data: restaurants } = useQuery({
    queryKey: [OWN_RESTAURANTS],
    queryFn: () => RestaurantsApi.getOwnRestaurants(),
  });
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
      <div className="flex items-center justify-between">
        <Heading1
          isCenter={false}
          desc="Choose a restaurant and view statistic information"
        >
          Restaurants
        </Heading1>
        <div className="w-72"></div>
        <Link
          href={`/admin/restaurant/add` as Route}
          onClick={() => {}}
          className="text-sm text-center hover:bg-gray-50 bg-white px-2 flex-shrink-0 font-normal rounded-xl border  py-2"
        >
          New restaurant
        </Link>
      </div>
      <div className={`grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3`}>
        {(restaurants || []).map((restaurant) => (
          <CardRestaurant
            isAdmin={true}
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
};
export default RestaurantsPage;
