import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { loginCustomer } from "../api/auth-api";

// Định nghĩa type cho kết quả trả về từ API
interface CustomerUserError {
  message: string;
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface LoginResult {
  customerAccessToken?: CustomerAccessToken;
  customerUserErrors?: CustomerUserError[];
}

type AppContext = {
  onLoginSuccess: (token: string) => void;
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { onLoginSuccess } = useOutletContext<AppContext>();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result: LoginResult = await loginCustomer(email, password);
      const errors = result.customerUserErrors;

      if (errors && errors.length > 0) {
        setMessage(errors[0].message);
      } else if (result.customerAccessToken) {
        const token = result.customerAccessToken.accessToken;
        if (token) {
          onLoginSuccess(token);
        }
        setMessage("Đăng nhập thành công! Đang chuyển hướng...");
      } else {
        setMessage("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch {
      setMessage("Lỗi kết nối. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`mt-2 w-full py-3 text-white font-medium rounded-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
