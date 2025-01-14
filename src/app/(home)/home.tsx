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
import StripeElement from "@/components/StripeElement/StripeElement";
import { Button } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import { generateOrderId, prepareCreateOrderContractTransfer } from "@/utils/contract";
import { Address, toNano } from "ton-core";
import { useTonConnect } from "../../../hooks/useTonConnect";
import { MetaData, OrdersApi } from "@/apis/orders";
const Home = () => {
  const { userInfo } = useAuthContext();
  const walletAddress = useTonAddress(true);
  const { sender, connected } = useTonConnect();
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
  const handleCreateOrderContract = async() => {
    const data: MetaData = {
      address: "QN",
      orderItems: [
        {
          dish: {
            id: 1,
            name: "Ice-cream",
            imageUrl: "https://images.pexels.com/photos/1407852/pexels-photo-1407852.jpeg",
            price: 0.2,
            description: ""
          },
          quantity: 1
        }
      ],
      name: "Binh",
      phone: "0978754723"
    }
    const {contract_address, order_id} = await OrdersApi.deployOrderContract();
    console.log(contract_address, order_id);
    const message = prepareCreateOrderContractTransfer(contract_address, {
      owner: Address.parse("0QDREisYb3hWcNevBoAopiS2UubbDp174WF0_v2XSZd9gcwL"),
      order_id: order_id,
      name: data.orderItems[0].dish.name,
      image: data.orderItems[0].dish.imageUrl,
      quantity: data.orderItems[0].quantity,
      price: toNano(data.orderItems[0].quantity * data.orderItems[0].dish.price),
      value: toNano(0.02)
    })
    await sender.send(message);
    await OrdersApi.deployNFT(data, walletAddress, order_id);
  }
  return (
    <>
      <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        {/* <StripeElement/> */}

        <Button onClick={handleCreateOrderContract}>Checkout</Button>
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
