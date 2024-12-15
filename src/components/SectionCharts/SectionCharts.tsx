import { FC } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TabList, { TabValue } from "../TabList/TabList";
import FilterListBox from "../FilterListBox/FilterListBox";
import { ResponsiveContainer } from "recharts";
interface SectionChartsProps {
  className?: string;
}
interface DataProps {
  name: string;
  UAW: number;
  volume: number;
  transactions: number;
}
const tabsValue: TabValue[] = [
  {
    title: "7d",
  },
  {
    title: "30d",
  },
  {
    title: "90d",
  },
  {
    title: "1y",
  },
  {
    title: "All",
  },
];
const SectionCharts: FC<SectionChartsProps> = ({ className }) => {
  const data: DataProps[] = [
    {
      name: "June 24",
      UAW: 30,
      volume: 2400,
      transactions: 2400,
    },
    {
      name: "June 25",
      UAW: 20,
      volume: 1800,
      transactions: 1900,
    },
    {
      name: "June 26",
      UAW: 60,
      volume: 1000,
      transactions: 2400,
    },
    {
      name: "June 27",
      UAW: 40,
      volume: 2100,
      transactions: 3000,
    },
  ];

  return <div className={`${className}`}></div>;
};
export default SectionCharts;
