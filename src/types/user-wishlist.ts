import { Dish } from "./dish";

export interface UserWishlist {
    id: number;
    userId: number;
    dishId: number;
}
export interface UserWishlistCreate {
    dishId: number;
}
export interface UserWishlistRes extends Pick<Dish, "id" | "name" | "price" | "imageUrl"> {
    dishId: Dish["id"];
}