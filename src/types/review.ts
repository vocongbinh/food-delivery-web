import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface Review {
    id: number;
    user: User;
    restaurant: Restaurant;
    comment: string;
    rate: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface ReviewForm {
    comment: string;
    rate: number;
    userId: number;
    restaurantId: number;
}