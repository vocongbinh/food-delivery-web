"use client"
import { TokensApi } from "@/apis/tokensApi";
import React, { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useQueries, useQuery } from "@tanstack/react-query";

// Register the scale
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
interface CoinChartProps {
    id: string;
    range: number;
    opts: {}
}

const CoinChart: FC<CoinChartProps> = ({ id, range, opts }) => {
    const { data: historyData, isFetching } = useQuery({ queryKey: [`${id}-history`], queryFn: () => TokensApi.getHistoryChart(id, range) });
    console.log(historyData)
    if (isFetching) return <></>
    else {
        const chartData = (historyData? historyData.prices:[]).map(([timestamp, price]: [number, number]) => ({
            time: new Date(timestamp),
            price: price,
        }));
        const data = {
            labels: chartData.map((point:any) => point.time.toLocaleString()),
            datasets: [
                {
                    label: 'Price',
                    data: chartData.map((point:any) => point.price),
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                    pointRadius: 0,
                },
            ],
        };
        return (

            <Line data={data} options={opts} />


        );
    }


}
export default CoinChart;