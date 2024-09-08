import { FC } from "react";
import RankingSlider, { RankingData, RankingSliderItem } from "./RankingSlider";
import TrendingIcon from "../../../public/trending.svg";
import RecentIcon from "@/images/address.svg";
import VisitIcon from "@/images/visited.svg";
interface FeaturedRankingProps {

}
const tableData: RankingData[] = [
    {
        index: 0,
        name: "Bitcoin",
        value: 4.7
    },
    {
        index: 1,
        name: "Bitcoin",
        value: 4.7
    },
    {
        index: 2,
        name: "Bitcoin",
        value: 4.7
    }

]

const data:RankingSliderItem[] = [
    {
        title: "Trending",
        icon: <TrendingIcon/>,
        data: tableData
    },
    {
        title: "Most Visited",
        icon: <VisitIcon/>,
        data: tableData
    },
    {
        title: "Recently added",
        icon: <RecentIcon/>,
        data: tableData
    },
]
const FeaturedRanking: FC<FeaturedRankingProps> = ({}) => {
        return <div className="relative">
            <RankingSlider galleryClass="bg-white border border-neutral-200 rounded-2xl" sliderData={data}/>
        </div>
}
export default FeaturedRanking;