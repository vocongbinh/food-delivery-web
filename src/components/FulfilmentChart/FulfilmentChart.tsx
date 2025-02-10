"use client";
import { useGetDateRangeStatistic } from "@/react-query/statistics";
import { Restaurant } from "@/types";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

const data = [
  { name: "Jan", pv: 2400 },
  { name: "Feb", pv: 1398 },
  { name: "Mar", pv: 9800 },
  { name: "Apr", pv: 3908 },
  { name: "May", pv: 4800 },
  { name: "Jun", pv: 3800 },
  { name: "Jul", pv: 4300 },
  { name: "Aug", pv: 2400 },
  { name: "Sep", pv: 1398 },
  { name: "Oct", pv: 9800 },
  { name: "Nov", pv: 3908 },
  { name: "Dec", pv: 4800 },
];

export default function FulfilmentChart({
  className,
  restaurantId,
}: {
  className?: string;
  restaurantId: Restaurant["id"];
}) {
  const { data: dateRangeData } = useGetDateRangeStatistic(restaurantId);
  const displayData = dateRangeData?.map((item) => ({
    name: item.day,
    pv: item.value,
  }));
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={200}
          data={displayData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
