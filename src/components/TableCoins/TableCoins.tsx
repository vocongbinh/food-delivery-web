"use client"
import { FC } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Token } from "@/data/types";
import { TokensApi } from "@/apis/tokensApi";
import { Table, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import Image from "next/image";
import { formatNumber } from "@/utils/convertNumbThousand";
interface TableCoinsProps {
    perPage: number;
}
interface DappStatistic {
    collection: string;
    floorPrice: number;
    avgPrice: number;
    mktCap: number;
    volume: number;
    percentVolume: number;
    trader: number;
    sales: number;
}
const renderCellHeader = ({ title, className }: { title: string, className?: string }) => {
    return <span className={`${className}`}>
        {title}
    </span>
}
const columns: ColumnType<Token>[] = [
    {
        title: "#",
        dataIndex: "market_cap_rank",

    },
    {
        title: renderCellHeader({ title: "Name", className: "font-bold text-left" }),
        dataIndex: "name",
        render: (name, record) => <div className="flex items-center">
            <Image src={record.image} width={60} height={60} alt="" className="w-4 lg:w-6 mr-4" />
            <span className="font-semibold"> {name}</span>
        </div>,
        align: "left"

    },
    {
        title: renderCellHeader({ title: "Price", className: "font-bold" }),
        dataIndex: "current_price",
        align: "right",
        render: (price) => <span>${formatNumber(price)}</span>,

    },
    {
        title: renderCellHeader({ title: "1h %", className: "font-bold" }),
        dataIndex: "price_change_percentage_1h_in_currency",
        render: (price) => <PercentCell percent={price} />,
        align: "right"
    },
    {
        title: renderCellHeader({ title: "24h %", className: "font-bold" }),
        dataIndex: "price_change_percentage_24h_in_currency",
        render: (price) => <PercentCell percent={price} />,
        align: "right"


    },
    {
        title: renderCellHeader({ title: "7d %", className: "font-bold" }),
        dataIndex: "price_change_percentage_7d_in_currency",
        render: (price) => <PercentCell percent={price} />,
        align: "right"

    },
    {
        title: renderCellHeader({ title: "Market Cap", className: "font-bold" }),
        dataIndex: "market_cap",
        render: (price) => <span>${formatNumber(price)}</span>,
        align: "right"

    },
    {
        title: renderCellHeader({ title: "Volume (24h)", className: "font-bold" }),
        dataIndex: "total_volume",
        render: (price) => <span>${formatNumber(price)}</span>,
        align: "right"


    },
    {
        title: renderCellHeader({ title: "circulating Supply", className: "font-bold" }),
        dataIndex: "circulating_supply",
        render: (price) => <span>${formatNumber(price)} BTC</span>,
        align: "right"


    },


];
const PercentCell = ({ percent }: { percent: number }) => {
    return <div className="flex items-center" style={{ float: "right" }}>
        {percent > 0 ? <ChevronUpIcon className="h3 w-3 text-green-700" /> : <ChevronDownIcon className="h3 w-3 text-red-700" />}
        <span className={
            ` ${percent > 0 ? "text-green-500" : "text-red-500"} font-bold`
        }>{Math.abs(percent).toFixed(2)}</span>
    </div>

}
const TableCoins: FC<TableCoinsProps> = ({ perPage }) => {
    const { data: tokens, isLoading } = useQuery({ queryKey: ["tokens"], queryFn: () => TokensApi.getListTokens(perPage) });
    if (isLoading) return <></>;
    return <Table
        columns={columns}
        dataSource={tokens}
        onChange={() => { }}
        showSorterTooltip={{
            target: 'sorter-icon',
        }}


    />
}
export default TableCoins;