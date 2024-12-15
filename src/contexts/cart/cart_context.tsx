// import { CartItem } from "@/types/cartItem";
// import { createContext, ReactNode, useContext, useState } from "react";
// export interface CartItem {
//     dish: Dish;
//     id: string;
//     quantity: string;
//     total: number;
//   }

// interface CartContextModel {
//   items: CartItem[];
//   setQuantity: (index: number,) => {}
//   increaseQuantity(index: number) => {}
//   decreaseQuantity(index: number) => {}
// }

// const CartContext = createContext<CartContextModel>({
//   items: [],
//   setQuantity: (index: number) => {}
// });
// const CartProvider = ({ children }: {children: ReactNode}) => {
//     const [items, setItems] = useState([])
//     const setQuantity(index: number) => {
//         setItems([
//             ...items,
//         ])
//     }
//   return <CartContext.Provider value={}>{children}</CartContext.Provider>;
// };

// export default CartProvider;
// export const useCartContext = () => useContext(CartContext);
