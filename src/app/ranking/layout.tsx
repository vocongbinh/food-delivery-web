// src/app/layout.tsx
import { TokensApi } from '@/apis/tokensApi';
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

//     // Prefetch the list of tokens
//  await queryClient.prefetchQuery({
//         queryKey: ['tokens'],
//         queryFn: () => TokensApi.getListTokens(50),
//     });

    //
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
};

export default Layout;