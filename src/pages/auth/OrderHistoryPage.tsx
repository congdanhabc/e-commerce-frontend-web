import { useCustomerOrders } from '../../hooks/order/useCustomerOrders';
import OrderItem from '../../components/order/OrderItem';
import { useAuth } from '../../providers/auth/useContextAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading';

export default function OrderHistoryPage() {
  const { isLoggedIn } = useAuth();
   const { orders, loading, error, hasNextPage, loadMore } = useCustomerOrders();
  const navigate = useNavigate();

  // BẢO VỆ ROUTE: Nếu chưa đăng nhập, đá về trang chủ
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <>
        <Loading />
        <span className='absolute left-0 top-120 w-full flex items-center justify-center'> Đang tải lịch sử đơn hàng...</span>
       
        </>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Lỗi: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Lịch sử Đơn hàng</h1>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(edge => (
            <OrderItem key={edge.node.id} order={edge.node} />
          ))}
        </div>
      )}

      {/* NÚT TẢI THÊM */}
      {loading && <div className="text-center mt-8">Đang tải thêm...</div>}
      
      {hasNextPage && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Tải thêm đơn hàng
          </button>
        </div>
      )}
    </div>
  );
}