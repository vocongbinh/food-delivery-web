
import React from "react";
import { getPrefetchQuery } from "@/hooks/useCustomQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SiteHeader from "@/app/SiteHeader";

export default async function DefaultHeader() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getPrefetchQuery({
        key: "global", urlParamsObject: {
            populate:
            {
                header: {
                    populate: {
                        links: {
                            populate: "*"
                        }
                    }
                }
            }
        }
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SiteHeader />
        </HydrationBoundary>

    );
};


