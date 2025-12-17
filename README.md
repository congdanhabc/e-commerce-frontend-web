# E-commerce Frontend Web

**E-commerce Frontend Web** là một dự án được xây dựng theo kiến trúc headless. Dự án này sử dụng React và TypeScript để tạo ra một trải nghiệm mua sắm nhanh và mượt mà, trong khi toàn bộ dữ liệu sản phẩm, khách hàng và giỏ hàng được quản lý bởi Shopify thông qua GraphQL API.

**Đường dẫn trang web:** [e-commerce-frontend-web-mu.vercel.app](https://e-commerce-frontend-web-mu.vercel.app)

---

## ✨ Các chức năng chính

Dự án này triển khai đầy đủ các chức năng cốt lõi của một trang thương mại điện tử:

### 🛍️ Trải nghiệm Mua sắm
*   **Khám phá sản phẩm:** Duyệt xem danh sách sản phẩm theo bộ sưu tập (collections) và thẻ (tags) được lấy trực tiếp từ Shopify.
*   **Trang chi tiết sản phẩm:** Xem thông tin đầy đủ, hình ảnh và giá của từng sản phẩm.
*   **Giỏ hàng động:** Thêm, xóa, cập nhật số lượng sản phẩm trong giỏ hàng.
*   **Tìm kiếm sản phẩm:** Tìm kiếm sản phẩm theo tên, theo các tiêu chí lọc và sắp xếp để nhanh chóng tìm thấy món đồ mong muốn.

### 👤 Quản lý Tài khoản Khách hàng
*   **Đăng ký:** Tạo tài khoản mới an toàn.
*   **Đăng nhập:** Xác thực người dùng và duy trì phiên đăng nhập.
*   **Quên mật khẩu & Đặt lại mật khẩu:** Cung cấp một luồng khôi phục tài khoản an toàn thông qua email, tích hợp với API của Shopify.
*   **Trang tài khoản:** Người dùng có thể xem lại lịch sử đơn hàng và quản lý thông tin cá nhân.

---

## 🛠️ Công nghệ sử dụng

Dự án này được xây dựng bằng các công nghệ và công cụ hiện đại nhất trong hệ sinh thái frontend:

*   **Framework:** **ReactJS** & **Vite**
*   **Ngôn ngữ:** **TypeScript**
*   **Giao diện & Styling:** **Tailwind CSS**
*   **API & Quản lý dữ liệu:** **GraphQL** (tương tác với Shopify Storefront API)
*   **Routing:** **React Router**
*   **Quản lý trạng thái:** **React Hooks**
*   **Deployment:** **Vercel** & **Git**

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

1.  **Clone repository:**
    ```bash
    git clone https://github.com/congdanhabc/e-commerce-frontend-web.git
    cd e-commerce-frontend-web
    ```

2.  **Cài đặt các dependencies:**
    ```bash
    npm install
    ```

3.  **Thiết lập biến môi trường:**
    *   Tạo một file có tên `.env` trong thư mục gốc của dự án.
    *   Điền các thông tin của Shopify Storefront API của bạn:
    ```env
    VITE_SHOPIFY_STORE_DOMAIN="your-shopify-store.myshopify.com"
    VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
    ```

4.  **Chạy server phát triển:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập `http://localhost:5173` (hoặc cổng mà terminal hiển thị).
