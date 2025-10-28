// src/hooks/useLogin.ts
import { useState } from 'react';
import { loginCustomer } from '../../api//auth-api';
import type { LoginResult } from "../../types/shopify"; // Giả sử bạn đưa các type này vào file riêng
import { useAuth } from '../../providers/auth/useContextAuth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  // 1. LẤY CÁC HÀM CẬP NHẬT TỪ CONTEXT
  const { onLogin } = useAuth();
  const navigate = useNavigate();


  // 2. QUẢN LÝ STATE CỤC BỘ CHO HÀNH ĐỘNG ĐĂNG NHẬP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3. HÀM LOGIN CHÍNH (LOGIC GỌI API)
  const login = async (email: string, password: string) => {
    // Kiểm tra đầu vào
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result: LoginResult = await loginCustomer(email, password);
      const errors = result.customerUserErrors;

      if (errors && errors.length > 0) {
        setError(errors[0].message);
        return; // Dừng lại nếu có lỗi từ API
      } 
      
      const accessToken = result.customerAccessToken?.accessToken;
      if (accessToken) {
        // CẬP NHẬT STATE TOÀN CỤC THÀNH CÔNG
        onLogin(accessToken);

        navigate('/');
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch (e) {
      setError("Lỗi kết nối. Vui lòng thử lại! - " + e);
    } finally {
      setLoading(false);
    }
  };

  // 4. TRẢ VỀ CÁC CÔNG CỤ CẦN THIẾT CHO COMPONENT UI
  return { login, loading, error };
}