import Image from "next/image";
import { FC } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { Community } from "@/data/types";
import { getStrapiMedia } from "@/utils/apiHelpers";
import Link from "next/link";
import { Route } from "next";
import Button from "../Button/Button";
import { ClassNames } from "@emotion/react";
interface CardCommunityProps {
    community: Community,
    pattern?: "white" | "primary";
    buttonClassName?: string;
    href?: Route
    target?: string;
}
const CardCommunity: FC<CardCommunityProps> = ({ community, pattern = "primary", buttonClassName = "", href, target = "" }) => {
    const { logo, name, description, titleButton, url } = community;
    href = url || href;
    return (<div className="flex items-center justify-between hover:bg-opacity-50 bg-white rounded-2xl border border-neutral-200 px-3 py-4">
        <div className="flex items-start gap-2">
            <div className="relative lg:w-16 w-20 lg:h-16 h-20">
                <Image className="object-cover" fill alt="communities" src={getStrapiMedia(logo.data.attributes.url) || ""} />
            </div>
            <div className="flex-1">
                {href ? <Link
                    href={href}
                    target={target}
                >
                    <p className="text-lg font-bold flex gap-2 items-center">{name} <ShieldCheckIcon className="w-5 h-5 text-blue-600" /></p>
                </Link> : <p className="text-lg font-bold flex gap-2 items-center">{name} <ShieldCheckIcon className="w-5 h-5 text-blue-600" /></p>}
                <span className="text-neutral-500">{description}</span>
            </div>
        </div>
        <span className="md:inline-block hidden">
            {href ? (
                <Link href={href}>
                    <Button className={`${buttonClassName}`} pattern={pattern}>
                        {titleButton}
                    </Button>
                </Link>
            ) : (
                <Button className={`${buttonClassName}`} pattern={pattern}>
                    {titleButton}
                </Button>
            )}
        </span>



    </div>);
}
export default CardCommunity;