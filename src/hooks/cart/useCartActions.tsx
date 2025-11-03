import { useState, useCallback } from 'react';
import * as cartApi from '../../api/cart-api';
import { useCart } from '../../providers/cart/useContextCart';
import { useAuth } from '../../providers/auth/useContextAuth';



export function useCartActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { cartContext, setCartContext } = useCart();
  const { token } = useAuth();

  const addToCart = useCallback(async (merchandiseId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      // Đọc `cartId` trực tiếp từ localStorage
      const cartId = cartContext?.id;
      let updatedCart;

      if (cartId) {
        updatedCart = await cartApi.addCartLines(cartId, [{ merchandiseId, quantity }]);
      } else {
        updatedCart = await cartApi.createCart([{ merchandiseId, quantity }], token || undefined);
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
  }, [cartContext, token, setCartContext]);


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
  
  const applyDiscount = useCallback(async (couponCode: string) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId || !couponCode) {
      throw new Error("Mã giảm giá không được để trống.");
    }
    
    setLoading(true);
    setError(null); // Reset lỗi trước khi thử lại
    try {
      const updatedCart = await cartApi.applyDiscountCode(cartId, [couponCode]);
      // Cập nhật state toàn cục của giỏ hàng
      setCartContext(updatedCart);
      return !(updatedCart.cost.subtotalAmount.amount === updatedCart.cost.totalAmount.amount)
      
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Mã giảm giá không hợp lệ.');
      setError(err);
      throw err; // Ném lỗi ra ngoài để UI có thể bắt và hiển thị
    } finally {
      setLoading(false);
    }
  }, [setCartContext]);

  return { 
    addToCart, 
    updateItemQuantity, 
    removeItem,
    applyDiscount,
    loading,
    error 
  };
}