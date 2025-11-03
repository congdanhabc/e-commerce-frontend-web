import { useEffect, useState } from "react";
import { CartItem } from "../components/cart/CartItem";
import { OrderSummary } from "../components/cart/OrderSummary";
import { useCartActions } from "../hooks/cart/useCartActions";
import { useCart } from "../providers/cart/useContextCart";
import { CheckCircle, XCircle } from "lucide-react";

export default function CartPage() {
  const { cartContext } = useCart();
  console.log(cartContext)

  const {
    updateItemQuantity,
    removeItem,
    applyDiscount,
    loading: actionLoading,
  } = useCartActions();

  const [recentlyUpdated, setRecentlyUpdated] = useState<number | null>(null);
  
  const [displayNotif, setDisplayNotif] = useState(false);
  const [notifContent, setNotifContent] = useState({
    message: "",
    type: "success",
  });

  // useEffect để tự động ẩn thông báo
  useEffect(() => {
    if (displayNotif) {
      const timer = setTimeout(() => {
        setDisplayNotif(false);
      }, 3000); // 3 giây
      return () => clearTimeout(timer);
    }
  }, [displayNotif]);


  const handleUpdate = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    try {
      await updateItemQuantity(lineId, newQuantity);

    } catch (error) {
      setNotifContent({ message: 'Cập nhật thất bại!', type: 'error' });
      setDisplayNotif(true);
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  const handleRemove = async (lineId: string) => {
    try {
      await removeItem(lineId);

      setNotifContent({ message: 'Đã xóa sản phẩm!', type: 'success' });
      setDisplayNotif(true); // Hiển thị thông báo
    } catch (error) {
      setNotifContent({ message: 'Xóa thất bại!', type: 'error' });
      setDisplayNotif(true); // Hiển thị thông báo
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const [couponCode, setCouponCode] = useState('');
  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setNotifContent({ message: 'Vui lòng nhập mã giảm giá.', type: 'error' });
      setDisplayNotif(true);
      return;
    }
    try {
      const result = await applyDiscount(couponCode);

      if(result) 
        setNotifContent({ message: 'Áp dụng mã thành công!', type: 'success' });
      else 
        setNotifContent({ message: 'Mã giảm giá không hợp lệ.', type: 'error' });
       
      setDisplayNotif(true); 
    } catch (err) {
      // Lỗi từ hook `applyDiscount` sẽ được bắt ở đây
      const errorMessage = err instanceof Error ? err.message : 'Mã giảm giá không hợp lệ.';
      setNotifContent({ message: errorMessage, type: 'error' });
      setDisplayNotif(true);
    }
  };


  if (!cartContext || cartContext.lines.edges.length === 0)
    return <div>Giỏ hàng trống.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold font-['Integral_CF'] mb-6">
            Giỏ hàng
          </h1>

          {displayNotif && (
            <div 
              // Sử dụng template literal để nối các class
              className={`flex items-center gap-3 p-3 rounded-lg shadow-lg text-sm font-medium
                ${notifContent.type === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }
              `}
            >
              {/* Hiển thị icon tương ứng */}
              {notifContent.type === 'success' 
                ? <CheckCircle className="w-5 h-5"/> 
                : <XCircle className="w-5 h-5"/>
              }
              <span>{notifContent.message}</span>
            </div>
          )}
          </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Cart Items */}
          <div className="flex-1">
          <div className="border border-black/10 rounded-2xl p-6 space-y-6">
            {cartContext.lines.edges.map((edge, index) => (
              <div key={edge.node.id}>
                <CartItem
                  id={edge.node.id}
                  name={edge.node.merchandise.product.title}
                  price={parseFloat(edge.node.merchandise.price.amount)}
                  quantity={edge.node.quantity}
                  image={edge.node.merchandise.image?.url || ""}
                  link={edge.node.merchandise.product.handle}
                  // Truyền các hàm wrapper mới
                  onUpdateQuantity={handleUpdate}
                  onRemove={handleRemove}
                  loading={recentlyUpdated === index}
                  onRecentlyUpdated={() => setRecentlyUpdated(index)}
                  disabled={actionLoading}
                />
                {index < cartContext.lines.edges.length - 1 && (
                  <div className="h-0.5 w-ful my-5 mx-3 bg-black" />
                )}
              </div>
            ))}
          </div>
        </div>

          {/* Order Summary */}
        <OrderSummary
          subtotal={cartContext.cost.subtotalAmount.amount}
          onCouponChange={setCouponCode}
          onApplyDiscount={handleApplyDiscount}
          isApplyingDiscount={actionLoading}
          discount={"0"}
          total={cartContext.cost.totalAmount.amount}
          checkoutUrl={cartContext.checkoutUrl}
        />
        </div>
      </div>
    </div>
  );
}
