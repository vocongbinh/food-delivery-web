
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { RestaurantsApi } from "@/apis/restaurants";
import { CategoriesApi } from "@/apis/categories";
import { DishTypesApi } from "@/apis/dish-types";
import { AuthsApi } from "@/apis/auths";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient(); 
    await queryClient.prefetchQuery({queryKey: ["profile"], queryFn: () => AuthsApi.getUserProfile()})
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex">
                <ProfileSidebar/>
            {children}
            </div>
        </HydrationBoundary>
    )

}