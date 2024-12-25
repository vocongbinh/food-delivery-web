import { USER_CART_KEY } from "@/contains/react_query_keys";
import ButtonPrimary from "../Button/ButtonPrimary";
import Heading from "../Heading/Heading";
import DishCartItem from "./DishCartItem";
import { CartsApi } from "@/apis/carts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAuthContext } from "@/contexts/auth/auth-context";
import {
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const RestaurantCart = () => {
  const { data: items } = useQuery({
    queryKey: [USER_CART_KEY],
    queryFn: () => CartsApi.getUserCarts(),
  });
  const { isLogin } = useAuthContext();
  const login = isLogin();
  return (
    <div className="mt-10 col-span-4 lg:col-span-2 flex gap-2 flex-col sticky top-0">
      <Heading className="ml-3">My cart is herer</Heading>
      <div className="mt-10 p-4 flex flex-col  justify-start rounded-3xl bg-white min-h-fit h-fit w-full overflow-auto">
        {items?.map((item) => (
          <>
            <DishCartItem cartItem={item} key={item.id} />
            <div className="flex justify-between mt-3">
              <div>Total</div>
              <div className="font-medium ">135.000đ</div>
            </div>
          </>
        ))}
        {items && items.length > 0 ? (
          <Link href={!login ? "/login" : `/checkout`} className="w-full">
            {!login ? (
              <ButtonPrimary className="w-full rounded-md mt-3">
                Login to order
              </ButtonPrimary>
            ) : (
              <ButtonPrimary className="w-full rounded-md mt-3">
                Check out
              </ButtonPrimary>
            )}
          </Link>
        ) : (
          <div className="flex flex-col justify-end items-center h-52">
            {/* <ChatBubbleBottomCenterTextIcon className="w-20 text-black" /> */}
            <div className="text-center">Your cart is empty</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RestaurantCart;
