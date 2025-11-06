import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../api/auth-api";

// Định nghĩa type cho kết quả trả về từ API
interface CustomerUserError {
  message: string;
}

interface RegisterResult {
  customerUserErrors?: CustomerUserError[];
}

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result: RegisterResult = await registerCustomer(
        email,
        password,
        firstName,
        lastName
      );

      const errors = result.customerUserErrors;

      if (errors && errors.length > 0) {
        setMessage(errors[0].message === "Email has already been taken" ? "Email này đã được đăng ký" : errors[0].message);
      } else {
        setMessage("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/login"), 1000);
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            placeholder="Họ"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Tên"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            type="submit"
            disabled={loading}
            className={`mt-2 w-full py-3 text-white font-medium rounded-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
