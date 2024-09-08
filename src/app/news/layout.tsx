
import { getPrefetchQuery, useCustomQuery } from "@/hooks/useCustomQuery"
import NewsLayout from "./newsLayout"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(getPrefetchQuery({
        key: "news-categories"
    }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <div className="flex lg:container lg:my-2 my-0 lg:flex-row flex-col justify-between lg:bg-[#f8f8f8] bg-white">
                    <NewsLayout />
                </div>
                {children}
            </div>
        </HydrationBoundary>
    )

}