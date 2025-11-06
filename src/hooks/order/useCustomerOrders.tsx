import { useState, useEffect, useCallback } from 'react';
import { getCustomerOrders } from '../../api/order-api';
import { useAuth } from '../../providers/auth/useContextAuth';
import type { ShopifyOrder } from '../../types/shopify';

type OrderEdge = {
  node: ShopifyOrder;
};

type UseCustomerOrdersResult = {
  orders: OrderEdge[];
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  loadMore: () => void;
};

type PageInfoState = {
  hasNextPage: boolean;
  endCursor: string | null; // <-- Nói rõ rằng nó có thể là string HOẶC null
};

export function useCustomerOrders(): UseCustomerOrdersResult {
  const [orders, setOrders] = useState<OrderEdge[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoState>({
    hasNextPage: false,
    endCursor: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { token } = useAuth(); // Lấy token từ context

  const fetchOrders = useCallback(async (cursor: string | null) => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true); // Luôn loading khi fetch
      const ordersData = await getCustomerOrders({
        customerAccessToken: token,
        after: cursor
      });

      if (ordersData) {
        // Nếu là tải thêm, nối vào mảng cũ
        setOrders(prev => cursor ? [...prev, ...ordersData.edges] : ordersData.edges);
        setPageInfo(ordersData.pageInfo);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to fetch orders."));
    } finally {
      setLoading(false);
    }
  }, [token]);

  // useEffect để fetch lần đầu
  useEffect(() => {
    fetchOrders(null);
  }, [fetchOrders]);
  
  // Hàm để tải thêm trang
  const loadMore = () => {
    if (pageInfo.hasNextPage && !loading) {
      fetchOrders(pageInfo.endCursor);
    }
  };

  return { 
    orders, 
    loading, 
    error, 
    hasNextPage: pageInfo.hasNextPage, 
    loadMore 
  };
}