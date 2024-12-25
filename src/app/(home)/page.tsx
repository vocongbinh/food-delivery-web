import React from "react";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import { getPrefetchQuery, useCustomQuery } from "@/hooks/useCustomQuery";
import { Blog, Category } from "@/data/types";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Home from "./home";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionAds from "@/components/Sections/SectionAds";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionMagazine2 from "@/components/Sections/SectionMagazine2";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DishTypesApi } from "@/apis/dishtypes";
import { RestaurantsApi } from "@/apis/restaurants";
import {
  DISH_TYPE_KEY,
  RESTAURANT_CART_KEY,
} from "@/contains/react_query_keys";
import { CartsApi } from "@/apis/carts";
import { DishesApi } from "@/apis/dishes";

//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
const restaurantId = 36;
export default async function PageHome() {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [DISH_TYPE_KEY],
        queryFn: () => DishTypesApi.getDishTypes(),
      }),
      queryClient.prefetchQuery({
        queryKey: [RESTAURANT_CART_KEY, restaurantId],
        queryFn: () => CartsApi.getRestaurantCarts(restaurantId),
      }),
      queryClient.prefetchQuery({
        queryKey: ["restaurants"],
        queryFn: () => RestaurantsApi.getRestaurants(new FormData()),
      }),
      queryClient.prefetchQuery({
        queryKey: ["recommend-dish"],
        queryFn: () => DishesApi.getRecommendedDishes(),
      }),
      queryClient.prefetchQuery(
        getPrefetchQuery({
          key: "communities",
          urlParamsObject: {
            populate: {
              logo: { fields: ["url"] },
            },
          },
        })
      ),
    ]);
  } catch (error) {
    console.error("Error prefetching queries:", error);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="nc-PageHome relative ">
        <div className="">
          <Home />
        </div>
        <div className="container relative ">
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewAuthors
              heading="Newest authors"
              subHeading="Say hello to future creator potentials"
              authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
            />
          </div>

          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="Top trending topics"
            subHeading="Discover 233 topics"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />

          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card9"
              heading="Explore latest audio articles"
              subHeading="Click on the icon to enjoy the music or podcast 🎧"
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
            />
          </div>

          <SectionMagazine1
            className="py-16 lg:py-28"
            posts={MAGAZINE1_POSTS}
          />

          <SectionAds />

          <SectionMagazine7
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
          />
        </div>

        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="relative container">
            <SectionGridPosts
              className="py-16 lg:py-28"
              headingIsCenter
              postCardName="card10V2"
              heading="Explore latest video articles"
              subHeading="Hover on the post card and preview video 🥡"
              posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div>

        <div className="container ">
          <SectionMagazine8
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
          />

          <div className="relative py-16">
            <BackgroundSection />
            <SectionMagazine9
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
            />
          </div>

          <SectionGridAuthorBox
            className="py-16 lg:py-28"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />

          <div className="relative py-16">
            <BackgroundSection />
            <SectionBecomeAnAuthor />
          </div>

          <SectionMagazine2
            className="py-16 lg:py-24"
            heading="Life styles 🎨 "
            posts={MAGAZINE2_POSTS}
          />

          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card11"
              heading="More design articles"
              subHeading="Over 1118 articles "
              posts={DEMO_POSTS.filter(
                (p, i) => i > 3 && i < 25 && p.postType === "standard"
              )}
            />
          </div>

          <SectionSubscribe2 className="pt-16 lg:pt-28" />

          <SectionVideos className="py-16 lg:py-28" />

          <SectionLatestPosts className="pb-16 lg:pb-28" />
        </div>
      </div>
    </HydrationBoundary>
  );
}
