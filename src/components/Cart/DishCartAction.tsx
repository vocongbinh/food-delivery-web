import { CartItem } from "@/types/cartItem";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import DishCardDetail from "../Checkout/DishCardDetail";
import { Dish } from "@/types/dish";
import { useUpdateCartQuantityMutation } from "@/react-query/carts";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Utils from "@/utils";

const DishCartAction = ({
  cartItem,
  dish,
}: {
  cartItem?: CartItem;
  dish?: Dish;
}) => {
  const updateCartItem = useUpdateCartQuantityMutation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  const [debouncedQuantity] = useDebounce(quantity, 1000); // Debounce for 500ms

  const handleUpdateCart = (value: number) => {
    if (value < 0) return;
    setQuantity(value);
  };

  useEffect(() => {
    if (
      debouncedQuantity !== cartItem?.quantity &&
      cartItem !== null &&
      cartItem?.id !== undefined
    ) {
      setIsUpdating(true);
      updateCartItem.mutate(
        {
          id: cartItem?.id!,
          quantity: debouncedQuantity,
        },
        {
          onSettled: () => {
            setIsUpdating(false);
          },
        }
      );
    }
    console.log("quantity" + debouncedQuantity);
    console.log("updated" + cartItem?.quantity);
  }, [debouncedQuantity]);

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex items-end justify-between mt-auto">
        <h3 className="line-clamp-2 font-medium text-sm">
          {cartItem
            ? Utils.formatCurrency(cartItem.dish?.price)
            : Utils.formatCurrency(dish?.price ?? 0)}
        </h3>
        {cartItem && (
          <div className="flex gap-4">
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateCart(quantity - 1)}
              className="p-1 bg-gray-400 rounded-md"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <div className="text-sm">{quantity}</div>
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateCart(quantity + 1)}
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
