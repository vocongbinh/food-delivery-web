import { Route } from "next";
import { BaseData, DataResponse, MediaData } from "./types";
import { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";

export interface LinkComponent extends BaseData {
  href: string;
  label: string;
  target: string;
}

export interface SocialComponent extends BaseData {
  url: string;
  name: string;
  logo: {
    data: MediaData;
  };
}
export interface FooterComponent extends BaseData {
  label: string;
  socials: SocialComponent[];
}
export interface HeaderComponent extends BaseData {
  title: string;
  subTitle: string;
}
export interface NavigationComponent extends BaseData {
  links: LinkComponent[];
}
interface NoticeComponent extends BaseData {
  title: string;
  content: string;
}
export interface FurtherInfoComponent extends BaseData {
  title: string;
  description: string;
  href: Route;
  logo: {
    data: MediaData;
  };
  firstContent: RootNode[];
  secondContent: RootNode[];
  notice: NoticeComponent;
  image: {
    data: MediaData;
  };
}
export interface ContactInfoComponent extends BaseData {
  title: string;
  content: string;
  icon: {
    data: MediaData;
  };
}
