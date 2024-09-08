
import CardCategory from "@/components/CardCategory/CardCategory";
import Heading1 from "@/components/Heading/Heading1";
import { Category } from "@/data/types";
import { getPrefetchQuery } from "@/hooks/useCustomQuery";
import { FC } from "react";
import bg from "../../../public/bg_image.png";
import { QueryClient } from "@tanstack/react-query";
import { DEMO_POSTS } from "@/data/posts";
import Card11 from "@/components/Card11/Card11";
import Card2 from "@/components/Card2/Card2";
interface RestaurantsPageProps {
}
const RestaurantsPage: FC<RestaurantsPageProps> = async ({ }) => {
    const queryClient = new QueryClient();
    const categories: Category[] = await queryClient.fetchQuery(getPrefetchQuery({
        key: "categories",
        urlParamsObject: {
            sort: ["updatedAt:desc"],
            populate: {
              featuredApp: {
                populate: {
                  logo: { fields: ["url"] },
                },
              },
            },
          }
    })); 
    const posts = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);;
    return <div className="py-20 lg:px-20 px-10" style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
    }}>
        <Heading1 isCenter={false} desc="Choose a restaurant and find the dish you need">Restaurants</Heading1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="grid gap-6">
          {posts
            .filter((_, i) => i < 3 && i > 0)
            .map((item, index) => {
              return (
                <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
              );
            })}
        </div>
        <div className="lg:col-span-2">
          {posts[0] && <Card2 size="large" post={posts[0]} />}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 md:col-span-3 xl:col-span-1">
          {posts
            .filter((_, i) => i < 5 && i >= 3)
            .map((item, index) => {
              return (
                <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
              );
            })}
        </div>
      </div>
    </div>
}
export default RestaurantsPage;