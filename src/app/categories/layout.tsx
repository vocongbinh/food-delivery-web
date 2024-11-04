
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { RestaurantsApi } from "@/apis/restaurants";
import { CategoriesApi } from "@/apis/categories";
import { DishTypesApi } from "@/apis/dish-types";
export default async function CategoriesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ["dish-types", "overview"], queryFn: () => DishTypesApi.getDishTypesOverview()})
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    )

}