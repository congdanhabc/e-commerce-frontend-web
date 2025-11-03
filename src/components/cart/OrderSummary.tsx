import { ArrowRight, Tag } from "lucide-react";

interface OrderSummaryProps {
  subtotal: string;
  onCouponChange: (value: string) => void;
  onApplyDiscount: (e: React.FormEvent) => void;
  isApplyingDiscount: boolean;
  discount: string;
  total: string;
  checkoutUrl: string;
}

// Hàm tiện ích định dạng giá
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function OrderSummary({
  subtotal,
  onCouponChange,
  onApplyDiscount,
  isApplyingDiscount,
  discount,
  total,
  checkoutUrl
}: OrderSummaryProps) {

  return (
    <div className="lg:w-[505px]">
      <div className="border border-black/10 rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Tóm tắt đơn hàng</h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Tạm tính</span>
            <span className="text-xl font-bold">{formatter.format(Number(subtotal))}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Giảm giá </span>
            <span className="text-xl font-bold text-red-500">- {formatter.format(Number(discount))}</span>
          </div>

          {/* <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Thuế</span>
            <span className="text-xl font-bold">{formatter.format(Number(tax))}</span>
          </div> */}

          <div className="h-0.5 w-ful my-5 mx-3 bg-black" />

          <div className="flex justify-between items-center">
            <span className="text-xl">Tổng cộng</span>
            <span className="text-2xl font-bold">{formatter.format(Number(total))}</span>
          </div>
        </div>

        {/* Promo Code */}
        <form onSubmit={onApplyDiscount} className="flex gap-3">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-3 gap-3">
            <Tag className="w-6 h-6 text-black/40" />
            <input
              type="text"
              placeholder="Add promo code"
              
              onChange={(e) => onCouponChange(e.target.value)}
              className="bg-transparent outline-none flex-1 text-black placeholder:text-black/40"
            />
          </div>
          <button type="submit" disabled={isApplyingDiscount} className="rounded-full bg-black text-white hover:bg-black/90 px-6">
            {isApplyingDiscount ? '...' : 'Áp dụng'}
          </button>
        </form>

        {/* Checkout Button */}
        <a href={checkoutUrl} className="flex items-center justify-center w-full h-15 rounded-full font-medium border-2 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
          <span>Đặt hàng</span>
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
