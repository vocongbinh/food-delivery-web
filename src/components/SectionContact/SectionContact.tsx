import { FC, ReactNode } from "react";
import AddressIcon from "@/images/address.svg";
import EmailICon from "@/images/email.svg";
import PhoneIcon from "@/images/phone.svg";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import ButtonPrimary from "../Button/ButtonPrimary";
import { ContactInfoComponent, HeaderComponent, SocialComponent } from "@/data/components";
import { head } from "lodash";
import { getStrapiMedia } from "@/utils/apiHelpers";
import Image from "next/image";
interface SectionContactProps {
    className?: string;
    header: HeaderComponent;
    contactInformation: ContactInfoComponent[];
    socialNetworks: SocialComponent[];
}
const SectionContact: FC<SectionContactProps> = ({ className = "", header, socialNetworks, contactInformation }) => {
    const renderSocialNetworks = () => {
       return socialNetworks.map((item, index) => {
            const image = getStrapiMedia(item.logo.data.attributes.url) || "";
            return  <img key={index} src={image} alt=""/>;
        } )
    }
    const renderContactInformation = () => {
        return contactInformation.map((item, index) => {
            const icon = getStrapiMedia(item.icon.data.attributes.url) || "";
            return <div key={index} className="flex flex-col gap-2">
                <span className="text-lg font-semibold flex gap-2 items-center uppercase"> <img src={icon} alt=""/>{item.title}</span>
                <span className="text-sm">{item.content}</span>
            </div>
        })
    }
    return <div className={`flex flex-col gap-4 ${className}`}>
        <h2 className="text-3xl font-semibold self-center">{header.title}</h2>
        <span className="text-sm self-center">{header.subTitle}</span>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-4 order-2 md:order-1">
                {renderContactInformation()}
                <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold flex gap-2 items-center uppercase">Community</span>
                <span className="text-sm flex gap-4">{renderSocialNetworks()}</span>
            </div>
            </div>
            <form className="flex flex-col gap-4 order-1 md:order-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold">Full name</h2>
                    <Input
                        required
                        sizeClass="rounded-xl p-3"
                        aria-required
                        placeholder="Example Doe"
                         />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold">Email</h2>
                    <Input
                        required
                        sizeClass="rounded-xl p-3"
                        aria-required
                        placeholder="Example@gmail.com"
                        type="email"
                         />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold">Messages</h2>
                    <Textarea
                        rows={8}
                        style={{
                            backgroundColor:"white!important"
                        }}
                         />
                </div>
                <ButtonPrimary className="self-end">Send Message</ButtonPrimary>



            </form>
        </div>

    </div>
}
export default SectionContact;