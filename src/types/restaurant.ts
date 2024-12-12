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
export enum RestaurantStatus {
  ACTIVATED = "ACTIVATED",
  DELETED = "DELETED",
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  CREATED = "CREATED",
}
