import { Category } from "./category";
import { User } from "./user";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  photoUrls: string;
  coverImageUrl: string;
  mainDish: string;
  status: RestaurantStatus;
  address: string;
  latitude: string;
  longitude: string;
  locationId: number;
  numReviews: number;
  rating: number;
  owner: User;
  categories: Category[];
}
export interface RestaurantRequest {
  name: string;
  description: string;
  imageUrl: string;
  mainDish: string;
  address: string;
  latitude: string;
  longitude: string;
  locationId: number;
  ownerId: number;
  categories: { name: string; dishNumber: number }[];
}
export enum RestaurantStatus {
  ACTIVATED = "ACTIVATED",
  DELETED = "DELETED",
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  CREATED = "CREATED",
}
