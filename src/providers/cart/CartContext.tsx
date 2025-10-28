import { createContext } from "react";

interface CartContextType {
  totalQuantity: number | null; 
  setTotalQuantity: (quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);