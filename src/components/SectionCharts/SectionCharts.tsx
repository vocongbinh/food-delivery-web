import { FC } from "react";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
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
        title: "7d"
    },
    {
        title: "30d"
    },
    {
        title: "90d"
    },
    {
        title: "1y"
    },
    {
        title: "All"
    }
]
const SectionCharts: FC<SectionChartsProps> = ({ className }) => {
    const data: DataProps[] = [
        {
            name: "June 24",
            UAW: 30,
            volume: 2400,
            transactions: 2400
        },
        {
            name: "June 25",
            UAW: 20,
            volume: 1800,
            transactions: 1900
        },
        {
            name: "June 26",
            UAW: 60,
            volume: 1000,
            transactions: 2400
        },
        {
            name: "June 27",
            UAW: 40,
            volume: 2100,
            transactions: 3000
        },
    ]

    return <div className={`${className}`}>
        <div className="text-2xl font-semibold">Title</div>
        <div className="flex justify-between items-center py-6">
            <TabList className="bg-neutral-200" onClickTab={() => { }} tabValues={tabsValue} />
            <div className="flex gap-4">
                <FilterListBox lists={[{ name: "Dropdown 1" }]} />
                <FilterListBox lists={[{ name: "Dropdown 2" }]} />
            </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data} barSize={70} >
                <XAxis dataKey="name" />
                <YAxis dataKey="volume" stroke="#2B52FF" tickFormatter={(value) => `$${value / 1000}k`} yAxisId={0} orientation="right" />
                <YAxis dataKey="transactions" yAxisId={1} stroke="#4AC4BA" orientation="right" />
                <YAxis dataKey="UAW" yAxisId={2} stroke="#D9D9D9" orientation="left" />

                {/* Secondary Y-axis for 'transactions' */}
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend wrapperStyle={{ top: "-10px" }} align="right" verticalAlign="top" />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" yAxisId={1} dataKey="transactions" stroke="#4AC4BA" strokeWidth={5} />
                <Bar dataKey="volume" yAxisId={0} fill="#2B52FF" radius={[4, 4, 0, 0]} />
                <Line type="monotone" yAxisId={2} dataKey="UAW" stroke="#D9D9D9" strokeWidth={5} />
            </ComposedChart>
        </ResponsiveContainer>

    </div>

}
export default SectionCharts;