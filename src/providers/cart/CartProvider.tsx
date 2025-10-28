import { useState, useEffect, type ReactNode } from 'react';
import { getCartSummary } from '../../api/cart-api'; // Giả sử bạn có hàm API nhẹ này
import { CartContext } from './CartContext';


export default function CartProvider({ children }: { children: ReactNode }) {
  // 1. KHỞI TẠO STATE BẰNG `null`
  // `null` đại diện cho trạng thái "Tôi chưa biết số lượng là bao nhiêu"
  const [totalQuantity, setTotalQuantity] = useState<number | null>(null);

  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem('cartId');
      
      if (cartId) {
        try {
          // Gọi API nhẹ để lấy số lượng
          const cartSummary = await getCartSummary(cartId); 
          if (cartSummary) {
            // Cập nhật state với số lượng thật
            setTotalQuantity(cartSummary.totalQuantity);
          } else {
            // Nếu cartId không hợp lệ, ta biết chắc số lượng là 0
            localStorage.removeItem('cartId');
            setTotalQuantity(0);
          }
        } catch (e) {
          console.error("Không thể khôi phục giỏ hàng, tạm thời coi như là 0:", e);
          setTotalQuantity(0); // Nếu lỗi, cũng coi như là 0
        }
      } else {
        // Nếu không có cartId, ta biết chắc số lượng là 0
        setTotalQuantity(0);
      }
    };
    
    initializeCart();
  }, []);
  
  const value = { totalQuantity, setTotalQuantity };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
