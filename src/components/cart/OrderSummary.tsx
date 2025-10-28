import { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  return (
    <div className="lg:w-[505px]">
      <div className="border border-black/10 rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Subtotal</span>
            <span className="text-xl font-bold">${subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Discount (-20%)</span>
            <span className="text-xl font-bold text-red-500">-${discount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl text-black/60">Delivery Fee</span>
            <span className="text-xl font-bold">${deliveryFee}</span>
          </div>

          <div className="h-0.5 w-ful my-5 mx-3 bg-black" />

          <div className="flex justify-between items-center">
            <span className="text-xl">Total</span>
            <span className="text-2xl font-bold">${total}</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-3 gap-3">
            <Tag className="w-6 h-6 text-black/40" />
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="bg-transparent outline-none flex-1 text-black/40 placeholder:text-black/40"
            />
          </div>
          <button className="rounded-full bg-black text-white hover:bg-black/90 px-6">
            Apply
          </button>
        </div>

        {/* Checkout Button */}
        <button className="flex items-center justify-center w-full h-15 rounded-full bg-black text-white hover:bg-black/90 font-medium">
          <span>Go to Checkout</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
