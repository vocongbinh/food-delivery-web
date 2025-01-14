"use client";

import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import SingleCommentLists from "@/app/(singles)/SingleCommentLists";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rate, Tooltip } from "antd";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";

import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "@/apis/restaurants";
import { Restaurant } from "@/types/restaurant";
import { Category } from "@/types/category";
import { DiscountsApi } from "@/apis/discounts";
import CardVoucher from "@/components/CardVoucher/CardVoucher";
import Link from "next/link";

import { ReviewsApi } from "@/apis/reviews";
import { ReviewForm } from "@/types/review";
import { DishesApi } from "@/apis/dishes";
import DishCardAdmin11 from "@/components/DishCard11/DischCardAdmin11";
import { LIST_DISH_KEY, LIST_VOUCHER_KEY } from "@/contains/react_query_keys";
import { Route } from "next";
import { SalesSummary } from "@/components/SaleComponent/SaleComponent";
import { TopProducts } from "@/components/TopProducts/TopProducts";
import LevelChart from "@/components/LevelChart/LevelChart";
import FulfilmentChart from "@/components/FulfilmentChart/FulfilmentChart";
import Spinner from "@/components/Spinner/Spinner";
export interface TabProps {
  id: number;
  name: string;
}

const RestaurantPage = ({ params }: { params: { restaurantId: number } }) => {
  const { restaurantId } = params;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rate, setRate] = useState<number>(0);
  const [tabActive, setTabActive] = useState<Category>();
  const { mutate } = useCustomMutation({
    key: "reviews",
    type: "create",
    queryKey: ["reviews", restaurantId],
  });
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => RestaurantsApi.getRestaurantById(restaurantId),
  });
  const { data: exchangedVoucher } = useQuery({
    queryKey: ["voucher", "exchanged"],
    queryFn: () => DiscountsApi.getActiveDiscounts(),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", restaurantId],
    queryFn: () => ReviewsApi.getReviews(restaurantId),
  });
  const isExchanged = (voucherId: number) => {
    return (exchangedVoucher || []).some(
      (voucher) => voucher.productDiscount.id == voucherId
    );
  };
  const { data: vouchers } = useQuery({
    queryKey: [LIST_VOUCHER_KEY, restaurantId],
    queryFn: () => DiscountsApi.getDiscounts(restaurantId),
  });
  const { data: dishes, isLoading: dishesLoading } = useQuery({
    queryKey: [LIST_DISH_KEY, restaurantId, tabActive?.id],
    queryFn: () =>
      DishesApi.getDishesByCategory(restaurantId, tabActive?.id || 1, 1, 10),
  });

  const handleClickTab = (tab: Category) => {
    setTabActive(tab);
  };
  const handleSubmit = () => {
    const content = textareaRef.current?.value || "";
    const data: ReviewForm = {
      comment: content,
      userId: 5,
      restaurantId: Number(restaurantId),
      rate,
    };
    mutate(data);
  };

  useEffect(() => {
    setTabActive(restaurant?.categories[0]);
  }, [restaurant]);

  if (isLoading) return <></>;
  else {
    const { name, description, imageUrl, rating, numReviews, categories } =
      restaurant as Restaurant;

    return (
      <>
        <div className="relative">
          <div className="container relative">
            <div className="flex flex-col justify-between mt-10">
              <div className="w-full aspect-w-3 aspect-h-1 flex-shrink-0 relative rounded-xl overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt=""
                  sizes="(max-width: 600px) 30vw, 40vw"
                  src={imageUrl}
                  unoptimized={true}
                />
              </div>
              <div className="mt-6">
                <h3 className="font-semibold md:text-2xl text-lg">{name}</h3>
                <p className="text-neutral-500 md:text-base text-sm py-2">
                  {description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="md:text-2xl text-lg font-semibold">
                    {rating}
                  </span>
                  <Rate defaultValue={rating} allowHalf disabled />
                  <span className="text-neutral-500 ">•</span>
                  <span className="text-neutral-500 md:text-base text-sm">
                    {reviews?.length || 0} Reviews
                  </span>
                </div>
              </div>
            </div>
            <div className="container py-10 flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <SalesSummary
                  className="w-full self-stretch"
                  title="Today's Sales"
                  subtitle="Sales Summary"
                />
                <div className="flex flex-col w-[35%] py-5 items-start rounded-xl bg-neutral-100 dark:bg-zinc-800">
                  <h2 className="px-3 text-black dark:text-white text-lg font-semibold">
                    Level
                  </h2>
                  <div className="w-full h-[200px]">
                    <LevelChart />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start w-full">
                <TopProducts className="w-[65%] self-stretch" />
                <div className="flex flex-col w-full py-5 items-start rounded-xl bg-neutral-100 dark:bg-zinc-800">
                  <h2 className="px-3 text-black dark:text-white text-lg font-semibold">
                    Level
                  </h2>
                  <FulfilmentChart className="w-full h-[240px]" />
                </div>
              </div>
            </div>

            <Nav
              className="sm:space-x-2 my-5 rtl:space-x-reverse"
              containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
            >
              {categories.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item.name}
                </NavItem>
              ))}
            </Nav>
            {dishesLoading ? (
              <Spinner/>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
                {dishes &&
                  dishes.map((dish, index) => (
                    <DishCardAdmin11 key={index} dish={dish} />
                  ))}
              </div>
            )}

            {/* {tabActive.id === 0 ? <>
                        <MySlider
                            className="py-10"
                            data={app.sliderImages.data || []}
                            renderItem={(item, indx) => <Media key={indx} data={item} />}
                            itemPerRow={3}
                        />
                        <div>
                            <div className="border-neutral-200 py-6">
                                <h3 className="font-semibold text-2xl">Description</h3>
                                <div className="text-sm py-3" >{app.description}</div>
                            </div>
                        </div>
                        <SectionStatisticApp className="p-6 bg-white rounded-3xl mb-10" />
                        <SectionCharts className="p-6 bg-white rounded-3xl mb-10" />

                        <div
                            id="comments"
                            className="scroll-mt-20 p-4 bg-white rounded-3xl"
                        >
                            <h3 className="text-xl font-semibold  text-center text-neutral-800 dark:text-neutral-200">
                                Reviews {reviews.length}
                            </h3>
                            <SingleCommentForm
                                textareaRef={textareaRef}
                                onClickSubmit={handleSubmit} />
                            <div className="max-w-screen-md py-10">
                                <SingleCommentLists reviews={reviews} />
                            </div>
                        </div>
                    </> : tabActive.id === 1 ? <SectionAppNews blogs={blogs} heading="News" /> : <div className="p-4 bg-white rounded-3xl"><BlocksRenderer content={app.updatedInformation || []} /></div>} */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Vouchers</h2>
                <Link
                  href={
                    `/admin/restaurant/${restaurantId}/discount/add}` as Route
                  }
                  onClick={() => {}}
                  className="text-sm text-center hover:bg-gray-50 bg-white px-2 flex-shrink-0 font-normal rounded-xl border  py-2"
                >
                  Add voucher
                </Link>
              </div>
              <div className="mt-8 lg:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {vouchers?.map((voucher, index) => (
                  <CardVoucher
                    isExchanged={isExchanged(voucher.id)}
                    isAdmin={true}
                    key={index}
                    voucher={voucher}
                  />
                ))}
              </div>
            </div>
            <div
              id="comments"
              className="scroll-mt-20 mt-10 p-4 bg-white rounded-3xl"
            >
              <h3 className="text-xl font-semibold  text-center text-neutral-800 dark:text-neutral-200">
                Reviews ({reviews?.length || 0})
              </h3>
              <SingleCommentForm
                rating={rate}
                setRating={setRate}
                textareaRef={textareaRef}
                onClickSubmit={handleSubmit}
              />
              <div className="max-w-screen py-10">
                <SingleCommentLists
                  reviews={reviews}
                  restaurantId={restaurantId}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default RestaurantPage;
