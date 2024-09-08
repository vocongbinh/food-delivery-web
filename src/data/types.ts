import { Route } from "@/routers/types";
import { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";
import { extend } from "lodash";
import { StaticImageData } from "next/image";
import { StringLiteral } from "typescript";
import { SocialComponent } from "./components";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType extends BaseData {
  // id: string | number;
  name: string;
  href: Route;
  count?: number;
  thumbnail?: string | StaticImageData;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route;
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType;
  date: string;
  href: Route;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string | StaticImageData;
  desc?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
}
export interface BaseData {
  id: number;
}
export type MediaData = {
  id: number,
  attributes: {
    url: string;
  };
};
//user
export interface Auth extends BaseData {
  username: string;
  firstname: string;
  lastname: string;
  avatar: {
    data: MediaData
  },
  position: string;
}
export interface User extends BaseData {
  username: string;
  email: string;
  avatar: {
    id: number;
    url: string;
  };
  position: string;
  settings: Setting[]
}
//setting
export interface Setting extends BaseData {
  key: string;
  name: string;
  description: string

}

//category
export interface Category extends BaseData {
  name: string;
  description: string;
  subTitle: string;
  images: {
    data: MediaData[];
  };
  href: Route;
  icon: {
    data: MediaData;
  };
  applications: {
    data: DataResponse<Application>[];
  };
  featuredApp: {
    data: DataResponse<Application>[];
  };
}

//application
export interface Application extends TaxonomyType {
  subTitle: string;
  description: string;
  logo: {
    data: MediaData;
  };
  developers: string;
  sliderImages: {
    data: MediaData[];
  };
  rating: number;
  category: Category;
  href: Route;
  reviews: {
    data: DataResponse<Review>[];
  };
  updatedInformation: RootNode[];
  blogs: {
    data: DataResponse<Blog>[];
  };
  socialNetworks: SocialComponent[];
}
//blog
export interface Blog extends BaseData {
  name: string;
  description?: String;
  featuredImage: {
    data: MediaData;
  };
  content: RootNode[];
  createdBy: {
    data: DataResponse<Auth>;
  };
  publishedAt: string | Date;
  newsCategory: {
    data: DataResponse<NewsCategory>;
  };
}
//review
export interface Review extends BaseData {
  content: string;
  rating: number;
  application: {
    data: DataResponse<Application>;
  };
  author: {
    data: DataResponse<Auth>;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}
export type ReviewFormData = {
  content: Review["content"];
  application: number;
  author: number;
  rating?: number;
};
interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DataResponse<T extends BaseData> {
  id: T["id"];
  attributes: Omit<T, "id">;
}
export interface PopulateResponse<T extends BaseData> {
  data: DataResponse<T>[] | DataResponse<T>;
}
export interface ObjectResponse<T extends BaseData> {
  data: DataResponse<T>[] | DataResponse<T>;
  meta?: Pagination;
}
export interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_rank: number;
  circulating_supply: number;
}

//advisement
export interface Advertisement extends BaseData {
  name: string;
  description: string;
  application: {
    data: DataResponse<Application>;
  };
  featuredImage: {
    data: MediaData;
  };
}
export interface Community extends BaseData {
  name: string;
  description: string;
  titleButton: string;
  logo: {
    data: MediaData;
  };
  url?: Route;
}

export interface NewsCategory extends BaseData {
  name: string;
  blogs: {
    data: DataResponse<Blog>[];
  };
  href: Route;
  color: string;
}

export interface MediaProps {}
export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray"
  | "white";
