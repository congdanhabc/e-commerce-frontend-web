import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoverPassword } from "../../hooks/auth/useRecoverPassword"; // <-- Sửa đường dẫn nếu cần

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  
  // Gọi custom hook để lấy logic
  const { recover, loading, error, isSuccess } = useRecoverPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      recover(email);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        
        {/* --- Phần hiển thị sau khi gửi email thành công --- */}
        {isSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Kiểm tra Email của bạn</h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến địa chỉ <strong>{email}</strong>. 
              Vui lòng kiểm tra hộp thư đến (và cả thư mục spam).
            </p>
            <Link 
              to="/login" 
              className="text-blue-600 hover:underline font-medium"
            >
              Quay lại trang Đăng nhập
            </Link>
          </div>
        ) : (
          /* --- Phần hiển thị form ban đầu --- */
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Quên Mật Khẩu</h2>
            <p className="text-center text-gray-600 mb-6">
              Đừng lo lắng! Hãy nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                {loading ? "Đang gửi..." : "Gửi liên kết khôi phục"}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              Nhớ ra mật khẩu rồi?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Đăng nhập
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}