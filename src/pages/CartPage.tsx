import { useState } from "react";
import { CartItem } from "../components/cart/CartItem";
import { OrderSummary } from "../components/cart/OrderSummary";
import { useCartActions } from "../hooks/cart/useCartActions";
import { useCart } from "../providers/cart/useContextCart";

export default function CartPage() {
  const { cartContext } = useCart();

  const {
    updateItemQuantity,
    removeItem,
    loading: actionLoading,
  } = useCartActions();

  const [recentlyUpdated, setRecentlyUpdated] = useState<number | null>(null);

  if (!cartContext || cartContext.lines.edges.length === 0)
    return <div>Giỏ hàng trống.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-['Integral_CF'] mb-6">
          Giỏ hàng
        </h1>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Cart Items */}
          <div className="flex-1">
          <div className="border border-black/10 rounded-2xl p-6 space-y-6">
            {cartContext.lines.edges.map((edge, index) => (
              <div key={edge.node.id}>
                <CartItem
                  id={edge.node.id}
                  name={edge.node.merchandise.product.title}
                  price={parseFloat(edge.node.merchandise.price.amount)}
                  quantity={edge.node.quantity}
                  image={edge.node.merchandise.image?.url || ""}
                  link={edge.node.merchandise.product.handle}
                  // Truyền các hàm wrapper mới
                  onUpdateQuantity={updateItemQuantity}
                  onRemove={removeItem}
                  loading={recentlyUpdated === index}
                  onRecentlyUpdated={() => setRecentlyUpdated(index)}
                  disabled={actionLoading}
                />
                {index < cartContext.lines.edges.length - 1 && (
                  <div className="h-0.5 w-ful my-5 mx-3 bg-black" />
                )}
              </div>
            ))}
          </div>
        </div>

          {/* Order Summary */}
        <OrderSummary
          subtotal={cartContext.cost.subtotalAmount.amount}
          discount={"0"}
          deliveryFee={"0"}
          total={cartContext.cost.subtotalAmount.amount}
        />
        </div>
      </div>
    </div>
  );
}
