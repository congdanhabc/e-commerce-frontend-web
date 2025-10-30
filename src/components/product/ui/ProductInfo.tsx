import { Minus, Plus, RotateCcw, ShoppingCart, Truck } from "lucide-react";
import type { ShopifyProduct } from "../../../types/shopify";
import { useCartActions } from "../../../hooks/cart/useCartActions";
import { useEffect, useState } from "react";

interface ProductInfoProps {
  product: ShopifyProduct;
}

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart, loading } = useCartActions();

  const handleAddToCart = async () => {
    const variantId = product.variants.edges[0]?.node.id;
    if (!variantId) return;

    try {
      // Gọi hàm `addToCart` từ hook `useCartActions`
      await addToCart(variantId, quantity);

      setNotifContent({ message: "Thêm vào giỏ hàng thành công!", type: "success" });
      setDisplayNotif(true);
    } catch (error) {
      setNotifContent({ message: "Thêm thất bại, thử lại.", type: "error" });
      setDisplayNotif(true);
      console.log("Lỗi khi thêm giỏ hàng: " + error);
    }
  };

  const [displayNotif, setDisplayNotif] = useState(false);
  const [notifContent, setNotifContent] = useState({
    message: "",
    type: "success",
  });
  useEffect(() => {
    if (displayNotif) {
      const timer = setTimeout(() => {
        setDisplayNotif(false);
      }, 3000); // 3000ms = 3 giây

      // Hàm dọn dẹp: hủy timer nếu component unmount hoặc displayNotif thay đổi
      return () => clearTimeout(timer);
    }
  }, [displayNotif]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold font-inter">{product.title}</h1>

        {/* Price */}
        <div className="text-2xl font-inter">
          {formatter.format(Number(product.priceRange.minVariantPrice.amount))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed border-b pb-6">
          {product.descriptionHtml}
        </p>
      </div>

      {/* Quantity and Buy Button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-400 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-11 flex items-center justify-center border-r border-gray-400 hover:bg-gray-100"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="w-20 h-11 flex items-center justify-center font-medium text-xl">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-11 flex items-center justify-center border-l border-gray-400 hover:bg-gray-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center px-12 h-11 bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 ease-in-out">
          Mua ngay
        </div>

        <button
          onClick={handleAddToCart}
          className="w-20 h-10 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-8 mx-1.5 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <span className="text-sm font-medium text-gray-800">
                Đang thêm...
              </span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" /> <ShoppingCart className="w-5 h-5" />
            </>
          )}
        </button>

        {/* <button className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button> */}

        {/* <div className="absolute flex w-60 h-15 items-center gap-3 right-4 z-50 bg-white px-4 py-3 rounded-lg shadow-lg"> */}
        {displayNotif && (
          <div
            className={`
                absolute flex w-60 h-15 items-center gap-3 right-4 z-50 bg-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium
                ${
                  notifContent.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              `}
          >
            <span>{notifContent.message}</span>
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="border border-gray-400 rounded">
        <div className="flex items-center gap-4 p-6 border-b border-gray-400">
          <Truck className="w-10 h-10" />
          <div className="space-y-2">
            <div className="font-medium">Miễn phí vận chuyển</div>
            <div className="text-xs">Đối với hóa đơn trên 1.000.000 đ.</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6">
          <RotateCcw className="w-10 h-10" />
          <div className="space-y-2">
            <div className="font-medium">Dễ dàng đổi trả</div>
            <div className="text-xs">
              Nếu sản phẩm xuất hiện lỗi từ nhà sản xuất.{" "}
              <span className="underline">Chi tiết</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
