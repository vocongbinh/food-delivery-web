
import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SiteHeader from "@/app/SiteHeader";
import Chatbot from "../Chatbot/Chatbot";

export default async function DefaultHeader() {
    const queryClient = new QueryClient();

    

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SiteHeader />
            <Chatbot/>
        </HydrationBoundary>

    );
};


