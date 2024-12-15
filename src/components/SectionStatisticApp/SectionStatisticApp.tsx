import { FC } from "react";
import TabList, { TabValue } from "../TabList/TabList";
import FilterListBox from "../FilterListBox/FilterListBox";
import StatisticCard, { StatisticCardProps } from "../StatisticCard/StatisticCard";
import { Clock, ChartSquare } from "iconsax-react";
// import SectionStatistic from "@/app/about/SectionStatistic";
interface SectionStatisticAppProps {
    className: string;
}
const statisticData: StatisticCardProps[] = [
    {
        title: "UAW",
        value: 100,
        changedValue: 20,
        color: "yellow",
        icon: "/icons/uaw.svg"
    },
    {
        title: "Transactions",
        value: 100,
        changedValue: 20,
        color: "blue",
        icon: "/icons/transactions.svg"

    },
    {
        title: "Volume",
        value: 100,
        changedValue: 20,
        color: "pink",
        icon: "/icons/volume.svg"
    },
    {
        title: "Balance",
        value: 100,
        changedValue: 20,
        color: "cyan",
        icon: "/icons/balance.svg"
    },
]
const tabValues: TabValue[] = [
    {
        title: "24h"
    },
    {
        title: "7d"
    },
    {
        title: "30d"
    }
]
const SectionStatisticApp: FC<SectionStatisticAppProps> = ({ className }) => {
    const renderStatisticCard = () => {
        return statisticData.map((item, index) => <StatisticCard key={index} {...item} />)
    }
    return <div className={`${className}`}>
        <div className="text-2xl font-semibold">Title</div>
        <div className="flex justify-between items-center py-6">
            <TabList className="bg-neutral-200" onClickTab={() => { }} tabValues={tabValues} />
            <div className="flex gap-4">
                {/* <FilterListBox lists={[{ name: "Dropdown 1" }]} />
                <FilterListBox lists={[{ name: "Dropdown 1" }]} /> */}
            </div>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 bg-white rounded-2xl mb-6">
            {renderStatisticCard()}
        </div>
        <div className="flex justify-between">
            <span className="text-sm flex items-center gap-2">
                <Clock
                    size="14"
                    color="#9395A4"
                    variant="Bold"
                />25 minutes ago</span>
            <span className="text-sm flex items-center gap-2"> <ChartSquare
                size="14"
                color="#9395A4"
                variant="Bold"
            />Get this data with TonStation API</span>
        </div>
    </div>
}
export default SectionStatisticApp;