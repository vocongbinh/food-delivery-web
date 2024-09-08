"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Community } from "@/data/types";
import CardCommunity from "../CardCommunity/CardCommunity";


export interface SectionCommunitiesProps {
    className?: string;
    heading: string;
    subHeading?: string;
    headingIsCenter?: boolean;
    gridClass?: string;
    communities: Community[];
}


const SectionCommunities: FC<SectionCommunitiesProps> = ({
    heading,
    subHeading = "",
    className = "",
    headingIsCenter = false,
    communities
}) => {

    const renderContent = (communities: Community[]) => {
        return communities.map((item, index) => <CardCommunity buttonClassName="whitespace-nowrap" key={index} community={item} />)
    }

    return (
        <div className={`nc-SectionCommunities ${className}`}>
            <div className={`flex justify-between`}>
                <Heading desc={subHeading} isCenter={headingIsCenter}>
                    {heading}
                </Heading>
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
                {renderContent(communities)}
            </div>

        </div>
    );


};

export default SectionCommunities;
