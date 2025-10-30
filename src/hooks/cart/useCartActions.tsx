import { useState, useCallback } from 'react';
import * as cartApi from '../../api/cart-api';
import { useCart } from '../../providers/cart/useContextCart';



export function useCartActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { setCartContext } = useCart();

  const addToCart = useCallback(async (merchandiseId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      // Đọc `cartId` trực tiếp từ localStorage
      const cartId = localStorage.getItem('cartId');
      let updatedCart;

      if (cartId) {
        updatedCart = await cartApi.addCartLines(cartId, [{ merchandiseId, quantity }]);
      } else {
        updatedCart = await cartApi.createCart([{ merchandiseId, quantity }]);
        // Lưu cartId mới
        localStorage.setItem('cartId', updatedCart.id);
      }
      
      // Cập nhật state toàn cục
      setCartContext(updatedCart);
      
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Failed to add item to cart');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCartContext]);


  const updateItemQuantity = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return; // Không có giỏ hàng để cập nhật
    
    setLoading(true);
    setError(null);
    try {
      const updatedCart = await cartApi.updateCartLines(cartId, [{ id: lineId, quantity }]);
      setCartContext(updatedCart);
    } catch (e) { 
        const err = e instanceof Error ? e : new Error('Failed to update item from cart');
        setError(err);
     } 
    finally { setLoading(false); }
  }, [setCartContext]);


  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;

    setLoading(true);
    setError(null);
    try {
      const updatedCart = await cartApi.removeCartLines(cartId, [lineId]);
      setCartContext(updatedCart);
    } catch (e) { 
        const err = e instanceof Error ? e : new Error('Failed to remove item from cart');
        setError(err);
     } 
    finally { setLoading(false); }
  }, [setCartContext]);

  return { 
    addToCart, 
    updateItemQuantity, 
    removeItem,
    loading,
    error 
  };
}