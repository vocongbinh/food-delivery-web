
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import Settings from './settings'
import { AuthsApi } from '@/apis/auths'

export default async function PostsPage() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({ queryKey: ["profile"], queryFn: () => AuthsApi.getUserProfile() })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Settings />
        </HydrationBoundary>
    )
}