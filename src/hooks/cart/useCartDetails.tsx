import { useState, useEffect } from 'react';
import { getCart } from '../../api/cart-api';
import type { ShopifyCart } from '../../types/shopify';

type UseCartDetailsResult = {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  // Hàm để fetch lại dữ liệu khi cần (ví dụ: sau khi cập nhật)
  refetch: () => void; 
};

/**
 * Hook chuyên dụng để lấy dữ liệu chi tiết của giỏ hàng.
 * Chỉ nên được sử dụng bởi CartPage.
 */
export function useCartDetails(): UseCartDetailsResult {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [triggerRefetch, setTriggerRefetch] = useState(0); // State để trigger fetch lại

  useEffect(() => {
    const fetchCartDetails = async () => {
      const cartId = localStorage.getItem('cartId');
      
      if (!cartId) {
        setLoading(false);
        setCart(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fullCart = await getCart(cartId);
        setCart(fullCart);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to fetch cart details."));
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
    
  }, [triggerRefetch]); // Chạy lại mỗi khi `triggerRefetch` thay đổi

  // Hàm để component bên ngoài có thể yêu cầu hook fetch lại dữ liệu
  const refetch = () => setTriggerRefetch(prev => prev + 1);

  return { cart, loading, error, refetch };
}