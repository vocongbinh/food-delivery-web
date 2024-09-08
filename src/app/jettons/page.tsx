"use client"

import Heading1 from "@/components/Heading/Heading1";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import TableTokens from "@/components/TableRanking/TableRanking";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TokensApi } from "@/apis/tokensApi";
import RankingCard from "@/components/RankingCard/RankingCard";
import Image from "next/image";


interface JettonsPageProps {
}
const JettonsPage: FC<JettonsPageProps> = ({ }) => {
    const { data: rankingTokens } = useQuery({ queryKey: ["rankingTokens"], queryFn: () => TokensApi.getTrendTokens() });
    return <></>;
    // <div className="container pt-20">
    //     <Heading1 isCenter={false} desc="Discover TON tokens, also known as jettons on TON Blockchain. Find up-to-date data on token prices, volume, market cap and other important information.">Jettons prices on The Open Network (TON)</Heading1>
    //     <div className="flex flex-col md:flex-row md:gap-4 gap-2">
    //         <div className="flex-1 flex flex-col gap-4">
    //             <div className="flex  h-1/2 justify-between bg-white rounded-xl p-4">
    //                 <div>
    //                     <h3 className="text-xl font-bold">$546,162,927.41</h3>
    //                     <span className="text-neutral-500 text-sm">24h Trading Volume</span>
    //                 </div>
    //                 <Image src="/chart.png" alt="" width={140} height={40} />
    //             </div>
    //             <div className="h-1/2 flex justify-between bg-white rounded-xl p-4">
    //                 <Image src="/jetton.jpg" alt="" className="object-cover" width={60} height={60} />
    //                 <div className="flex-1 px-4" >
    //                     <h3 className="text-xl font-bold">Jetton</h3>
    //                     <span className="text-neutral-500 text-sm">JETTON</span>
    //                 </div>
    //                 <div>
    //                     <h3 className="text-xl font-bold">$1.94</h3>
    //                     <span className="text-green-500 text-sm">11.47%</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="flex-1">
    //             <RankingCard tokens={rankingTokens?.slice(0, 3) || []} title="Trending" /></div>
    //         <div className="flex-1">
    //             <RankingCard tokens={rankingTokens?.slice(4, 7) || []} title="Largest Gainers" /></div>
    //     </div>
    //     <Combobox
    //     >
    //         <div className="relative bg-white my-4  rounded-2xl">
    //             <MagnifyingGlassIcon
    //                 className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
    //                 aria-hidden="true"
    //             />
    //             <Combobox.Input
    //                 className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
    //                 placeholder="Search..."
    //                 onChange={(event) => { }}
    //             />
    //         </div>
    //     </Combobox>
    //     <TableTokens perPage={100} />
    // </div>
}
export default JettonsPage;