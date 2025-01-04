"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionDishOfType from "@/components/SectionDishOfType/SectionDishOfType";
import { DEMO_POSTS_AUDIO } from "@/data/posts";
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
import Chatbot from "@/components/Chatbot/Chatbot";
import SectionRecommendedDish from "@/components/Sections/SectionRecommendedDish";
import { DishesApi } from "@/apis/dishes";
import StatisticComponent from "@/components/StatisticComponent/StatisticComponent";
import { RecommendedDish } from "@/types/recommendedDish";
import { useAuthContext } from "@/contexts/auth/auth-context";
const Home = () => {
  const { userInfo } = useAuthContext();
  const recommendedDishes: RecommendedDish[] = useMemo(() => {
    if (localStorage && localStorage.getItem("recommendedDishes")) {
      return JSON.parse(localStorage.getItem("recommendedDishes") as string);
    }
    return [];
  }, [localStorage]);
  const { data: dishTypes } = useQuery({
    queryKey: [DISH_TYPE_KEY],
    queryFn: () => DishTypesApi.getDishTypes(),
  });

  const { data: dishes } = useQuery({
    queryKey: ["Recommend-dish"],
    queryFn: () => DishesApi.getRecommendedDishes(),
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
        posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
        dishes={dishType.dishes}
      />
    ));
  const myCart = () => {
    const dish = dishTypes?.[0].dishes?.[0];
    return (
      <div className="mt-10 col-span-4 lg:col-span-2 flex gap-2 flex-col">
        <Heading className="ml-3">My Cart Is Here</Heading>
        <div className="md:mt-14 mt-10 p-4 flex flex-col overflow-hidden justify-start rounded-3xl bg-white h-80 w-full">
          {/* <div>Cart is empty now</div> */}
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
    <>
      <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        {userInfo && (
          <div className="relative container">
            <SectionRecommendedDish
              className="py-16 lg:py-28"
              headingIsCenter
              postCardName="card10V2"
              heading="Discover foods that meet your nutritional needs"
              subHeading="Hover on the card and preview image 🥡"
              dishes={dishes || []}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        )}
      </div>
      {/* < StatisticComponent data={recommendedDishes[0]} />/ */}
      <div className="grid grid-cols-4 gap-8 px-10">
        <div className={userInfo ? "col-span-3" : "col-span-4"}>
          {renderDishOfType()}
        </div>
        {userInfo && (
          <div className="w-full min-w-[200px]">
            <RestaurantCart />
          </div>
        )}{" "}
        {/* <Chatbot className="fixed bottom-10 right-10"/> */}
      </div>
    </>
  );
};

export default Home;
