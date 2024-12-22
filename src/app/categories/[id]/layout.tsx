
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { RestaurantsApi } from "@/apis/restaurants";
import { CategoriesApi } from "@/apis/categories";
import { DishTypesApi } from "@/apis/dish-types";
import SidebarCategory from "@/components/SidebarCategory/SidebarCategory";
export default async function CategoriesLayout({
    children,
    params
}: {
    children: React.ReactNode;
     params: { id: number }
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ["dish-types", "overview"], queryFn: () => DishTypesApi.getDishTypesOverview()})
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex md:flex-row flex-col">
                <div className="md:w-1/4 w-full md:h-[100vh] dark:bg-neutral-900 dark:text-white bg-neutral-200 bg-grey-200"><SidebarCategory dishtypeId={params.id}/></div>
                <div className="overflow-auto h-screen w-full">{children}</div>
            </div>
        </HydrationBoundary>
    )

}