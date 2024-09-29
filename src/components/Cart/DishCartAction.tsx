import { CartsApi } from "@/apis/carts";
import { RESTAURANT_CART_KEY } from "@/contains/react_query_keys";
import { CartItem } from "@/types/cartItem";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { QueryClient, useMutation } from "@tanstack/react-query";
import DishCardDetail from "../Checkout/DishCardDetail";
import { Dish } from "@/types/dish";

const DishCartAction = ({
  cartItem,
  dish,
}: {
  cartItem?: CartItem;
  dish?: Dish;
}) => {
  const queryClient = new QueryClient();
  const updateCartItem = useMutation({
    mutationFn: (data: {
      id: CartItem["id"];
      quantity: CartItem["quantity"];
    }) => {
      return CartsApi.updateCartQuantity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RESTAURANT_CART_KEY, cartItem?.id],
      });
    },
  });
  const createCartItem = useMutation({
    mutationFn: (data: {
      id: CartItem["id"];
      quantity: CartItem["quantity"];
    }) => {
      return CartsApi.updateCartQuantity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RESTAURANT_CART_KEY, cartItem?.id],
      });
    },
  });
  const handleUpdateCartItem = (value: number) => {
    if (value < 0) return;
    else {
      updateCartItem.mutate({ id: cartItem?.id ?? "", quantity: value });
    }
  };
  const handleCreateCartItem = (value: number) => {
    if (value < 0) return;
    else {
      updateCartItem.mutate({ id: cartItem?.id ?? "", quantity: value });
    }
  };
  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex items-end justify-between mt-auto">
        <h3 className="line-clamp-2 font-medium text-sm">
          {cartItem ? cartItem.dish?.price : dish?.price}đ
        </h3>
        {cartItem && (
          <div className="flex gap-4">
            <button
              disabled={updateCartItem.isPending}
              onClick={(e) => handleUpdateCartItem(cartItem.quantity - 1)}
              className="p-1 bg-gray-400 rounded-md"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <div className="text-sm">{cartItem.quantity}</div>
            <button
              disabled={updateCartItem.isPending}
              onClick={(e) => handleUpdateCartItem(cartItem.quantity - 1)}
              className="p-1 bg-primary-500 text-white rounded-md"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        {!cartItem && (
          <DishCardDetail
            dish={dish!}
            renderTrigger={({ onClick }) => (
              <button
                onClick={() => onClick()}
                disabled={updateCartItem.isPending}
                className="p-1 bg-primary-500 text-white rounded-md"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            )}
          />
        )}
      </div>
    </div>
  );
};
export default DishCartAction;
