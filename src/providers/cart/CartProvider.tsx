import { useState, useEffect, type ReactNode } from 'react';
import { getCart } from '../../api/cart-api'; // Giả sử bạn có hàm API nhẹ này
import { CartContext } from './CartContext';
import type { ShopifyCart } from '../../types/shopify';


export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartContext, setCartContext] = useState<ShopifyCart | null>(null);

  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem('cartId');
      
      if (cartId) {
        try {
          const cart = await getCart(cartId); 
          if (cart) {
            setCartContext(cart);
          } else {
            localStorage.removeItem('cartId');
            setCartContext(null);
          }
        } catch (e) {
          console.error("Không thể khôi phục giỏ hàng:", e);
          setCartContext(null);
        }
      } else {
        setCartContext(null);
      }
    };
    
    initializeCart();
  }, []);
  
  const value = { cartContext, setCartContext };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
