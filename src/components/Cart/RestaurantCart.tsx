import { RESTAURANT_CART_KEY } from "@/contains/react_query_keys";
import ButtonPrimary from "../Button/ButtonPrimary";
import Heading from "../Heading/Heading";
import DishCartItem from "./DishCartItem";
import { CartsApi } from "@/apis/carts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const RestaurantCart = () => {
  const { data: items } = useQuery({
    queryKey: [RESTAURANT_CART_KEY, "36"],
    queryFn: () => CartsApi.getRestaurantCarts("36"),
  });
  return (
    <div className="mt-10 col-span-4 lg:col-span-2 flex gap-2 flex-col">
      <Heading className="ml-3">My cart is herer</Heading>
      <div className="mt-10 p-4 flex flex-col overflow-hidden justify-start rounded-3xl bg-white h-80 w-full">
        {/* <div>Cart is empty now</div> */}
        {items?.map((item) => (
          <DishCartItem cartItem={item} />
        ))}
        <div className="flex justify-between mt-3">
          <div>Total</div>
          <div className="font-medium ">135.000đ</div>
        </div>
        <Link href="/checkout" className="w-full">
          <ButtonPrimary className="w-full rounded-md mt-3">
            Login to order
          </ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};
export default RestaurantCart;
