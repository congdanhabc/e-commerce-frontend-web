import { useState } from 'react';
import { recoverCustomer } from '../../api/auth-api'; // <-- Sửa đường dẫn nếu cần

export const useRecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false); // Thêm state để báo thành công

  const recover = async (email: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await recoverCustomer(email);
      
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        // Nếu Shopify trả về lỗi (ví dụ: email không tồn tại)
        setError(result.customerUserErrors[0].message);
      } else {
        // Nếu không có lỗi, tức là email đã được gửi thành công
        setIsSuccess(true);
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại: " + err);
    } finally {
      setLoading(false);
    }
  };

  return { recover, loading, error, isSuccess };
};