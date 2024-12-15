"use client";

import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import SingleCommentLists from "@/app/(singles)/SingleCommentLists";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Media from "@/components/Media";
import MySlider from "@/components/MySlider";
import { Application, ReviewFormData } from "@/data/types";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { getStrapiMedia } from "@/utils/apiHelpers";
import { retrieveDataFromResponse } from "@/utils/retrieveDataFromResponse";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rate, Tooltip } from "antd";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";

import { useQuery } from "@tanstack/react-query";
import { RestaurantsApi } from "@/apis/restaurants";
import { Restaurant } from "@/types/restaurant";
import { Category } from "@/types/category";
import { DiscountsApi } from "@/apis/discounts";
import CardVoucher from "@/components/CardVoucher/CardVoucher";
import { Alert, CircularProgress, Pagination, Snackbar } from "@mui/material";
import { ReviewsApi } from "@/apis/reviews";
import { ReviewForm } from "@/types/review";
import { DishesApi } from "@/apis/dishes";
import DishCard11 from "@/components/DishCard11/DishCard11";
import { Map1 } from "iconsax-react";
import axios from "axios";
import { useAddressContext } from "@/contexts/address/address-context";
import ModalShowDistance from "@/components/ModalShowDistance/ModalShowDistance";
import DistanceMapComponent from "@/components/DistanceMapComponent/DistanceMapComponent";
export interface TabProps {
  id: number;
  name: string;
}

const RestaurantPage = ({ params }: { params: { id: number } }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { location } = useAddressContext();
  const [rate, setRate] = useState<number>(0);
  const [tabActive, setTabActive] = useState<Category>();
  const [distance, setDistance] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate } = useCustomMutation({
    key: "reviews",
    type: "create",
    queryKey: ["reviews", params.id],
  });
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurants", params.id],
    queryFn: () => RestaurantsApi.getRestaurantById(params.id),
  });
  const { data: reviews } = useQuery({
    queryKey: ["reviews", params.id],
    queryFn: () => ReviewsApi.getReviews(params.id),
  });

  const { data: exchangedVoucher } = useQuery({
    queryKey: ["voucher", "exchanged"],
    queryFn: () => DiscountsApi.getActiveDiscounts(),
  });
  
  
  const { data: vouchers } = useQuery({
    queryKey: ["vouchers", params.id],
    queryFn: () => DiscountsApi.getDiscounts(params.id),
  });
  const { data: dishes, isLoading: dishesLoading } = useQuery({
    queryKey: ["vouchers", params.id, tabActive?.id],
    queryFn: () =>
      DishesApi.getDishesByCategory(params.id, tabActive?.id || 1, 1, 10),
  });

  const isExchanged = (voucherId: number) => {
    return (exchangedVoucher || []).some(voucher => voucher.productDiscount.id == voucherId)
  }

  
  

  useEffect(() => {
    const calculateDistance = async (restaurant: Restaurant) => {
      const accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || "";
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.longitude},${location.latitude};${restaurant?.longitude},${restaurant?.latitude}?geometries=geojson&access_token=${accessToken}`;
      const res = await axios.get(url);
      console.log(res.data);
      const distance = res.data.routes[0].distance / 1000;
      setDistance(distance);
    };
    if (restaurant !== undefined) {
      calculateDistance(restaurant);
    }
  }, [restaurant]);

  const handleClickTab = (tab: Category) => {
    setTabActive(tab);
  };
  const handleSubmit = () => {
    const content = textareaRef.current?.value || "";
    const data: ReviewForm = {
      comment: content,
      userId: 5,
      restaurantId: Number(params.id),
      rate,
    };
    mutate(data);
  };
  const renderModalContent = () => {
    return (
     
        <DistanceMapComponent long={restaurant?.longitude} lat={restaurant?.latitude} />
        
    
    );
  };

  useEffect(() => {
    setTabActive(restaurant?.categories[0]);
  }, [restaurant]);

  if (isLoading) return <></>;
  else {
    const {
      name,
      description,
      imageUrl,
      rating,
      numReviews,
      categories,
    } = restaurant as Restaurant;

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
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold md:text-2xl text-lg">
                      {name}
                    </h3>
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
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-lg">{distance.toFixed(2)} km</span>
                    <ModalShowDistance
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            renderTrigger={(openModal) => (
              <div
                onClick={openModal}
                className=" cursor-pointer px-4 max-w-[300px] rounded-3xl border border-gray-400 flex gap-2 items-center"
              >
                    <Map1 size="45" color="#2b52ff" variant="Bold" className="cursor-pointer" />
              </div>
            )}
            modalTitle="Distance"
            renderContent={renderModalContent}
          />
                  </div>
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
              <div className="flex items-center justify-center">
                <CircularProgress />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
                {dishes &&
                  dishes.map((dish, index) => (
                    <DishCard11 key={index} dish={dish} />
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
              <h2 className="font-semibold text-2xl">Vouchers</h2>
              <div className="mt-8 lg:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {vouchers?.map((voucher, index) => (
                  <CardVoucher key={index} voucher={voucher} isExchanged={isExchanged(voucher.id)} />
                ))}
              </div>
            </div>
            <div
              id="comments"
              className="scroll-mt-20 p-4 bg-white rounded-3xl mt-10"
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
                  restaurantId={params.id}
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
