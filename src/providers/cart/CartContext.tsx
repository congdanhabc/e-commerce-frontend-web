import { createContext } from "react";
import type { ShopifyCart } from "../../types/shopify";

interface CartContextType {
  cartContext: ShopifyCart | null; 

  setCartContext: (cart: ShopifyCart) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);