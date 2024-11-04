import { Dish } from "./dish"

export interface DishType {
    id: string
    name: string
    dishes: Dish[]
}