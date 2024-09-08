import { getPrefetchQuery } from '@/hooks/useCustomQuery'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import Settings from './settings'

export default async function PostsPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(getPrefetchQuery({ key: "settings" }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Settings />
        </HydrationBoundary>
    )
}