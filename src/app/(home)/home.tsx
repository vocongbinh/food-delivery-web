"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import SectionDishOfType from "@/components/SectionDishOfType/SectionDishOfType";
import { DEMO_POSTS_AUDIO } from "@/data/posts";
import { DishType } from "@/types/dishType";
import SectionDishOfType2 from "@/components/SectionDishOfType2/SectionDishOfType2";
import { DISH_TYPE_KEY } from "@/contains/react_query_keys";
import { DishTypesApi } from "@/apis/dishtypes";
import SectionHero from "@/components/SectionHero/SectionHero";
import rightImg from "@/images/hero-right.png";
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import Heading from "@/components/Heading/Heading";
import DishCartItem from "@/components/DishCard11/DishCartItem";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import RestaurantCart from "@/components/Cart/RestaurantCart";

const Home = () => {
  const { data: dishTypes } = useQuery({
    queryKey: [DISH_TYPE_KEY],
    queryFn: () => DishTypesApi.getDishTypes(),
  });
  const landingSection = () => {
    return (
      <div className="nc-PageHomeDemo3 relative">
        <div className="container relative">
          <SectionHero
            rightImg={rightImg}
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
            heading={
              <span>
                Premium quality <br /> Food for your healthy <br /> & Daily{" "}
                {` `}
                <span className="relative pr-3">
                  <Image
                    className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                    src={Vector1}
                    alt=""
                  />
                  <span className="relative">life</span>
                </span>
              </span>
            }
            btnText="Getting started"
            subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
          />
        </div>
      </div>
    );
  };
  const renderDishOfType = () =>
    dishTypes?.map((dishType, index) => (
      <SectionDishOfType
        className="mt-10"
        key={dishType.id}
        heading={dishType.name}
        subHeading="Delicious"
        posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
        dishes={dishType.dishes}
      />
    ));
  const myCart = () => {
    const dish = dishTypes?.[0].dishes?.[0];
    return (
      <div className="mt-10 col-span-4 lg:col-span-2 flex gap-2 flex-col">
        <Heading className="ml-3">My cart is herer</Heading>
        <div className="mt-10 p-4 flex flex-col overflow-hidden justify-start rounded-3xl bg-white h-80 w-full">
          {/* <div>Cart is empty now</div> */}
          <DishCartItem dish={dish} />
          <DishCartItem dish={dish} />
          <div className="flex justify-between mt-3">
            <div>Total</div>
            <div className="font-medium ">135.000đ</div>
          </div>
          <ButtonPrimary className=" rounded-md mt-3">
            Login to order
          </ButtonPrimary>
        </div>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-8 gap-4 ">
      <div className="lg:col-span-6 col-span-4">{renderDishOfType()}</div>
      <RestaurantCart />
    </div>
  );
};

export default Home;
