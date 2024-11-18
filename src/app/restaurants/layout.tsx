
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { RestaurantsApi } from "@/apis/restaurants";
import { DiscountsApi } from "@/apis/discounts";
export default async function RestaurantsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["restaurants"],
        queryFn: () => RestaurantsApi.getRestaurants(new FormData())
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    )

}