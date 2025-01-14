"use client";
import Heading1 from "@/components/Heading/Heading1";
import bg from "../../../../public/bg_image.png";
import { useQuery } from "@tanstack/react-query";

import { RestaurantsApi } from "@/apis/restaurants";
import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { OWN_RESTAURANTS } from "@/contains/react_query_keys";

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
      <Heading1
        isCenter={false}
        desc="Choose a restaurant and find the dish you need"
      >
        Restaurants
      </Heading1>
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
