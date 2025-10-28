import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";

export default function Login() {
  // 1. STATE CỤC BỘ CHO FORM INPUT
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. GỌI CUSTOM HOOK ĐỂ LẤY LOGIC
  // `login` là hàm để thực thi, `loading` và `error` là các trạng thái
  const { login, loading, error } = useLogin();

  // 3. HÀM XỬ LÝ SUBMIT, CHỈ GỌI HÀM TỪ HOOK
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tải lại trang
    login(email, password); // Gọi hàm logic từ hook
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
            onClick={handleSubmit}
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

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
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
