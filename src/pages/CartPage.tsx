import { useState } from "react";
import { CartItem } from "../components/cart/CartItem";
import { OrderSummary } from "../components/cart/OrderSummary";

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/99a5be46e9c3a31266c32ff3d29b604d72269210?width=250",
    },
    {
      id: 2,
      name: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      quantity: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/fc7d6e9ce597e4f413b6721b3360f7ff2203ad3b?width=250",
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      size: "Large",
      color: "Blue",
      price: 240,
      quantity: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ff350074d8cf8790913092588250f9213f89d607?width=204",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

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
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <CartItem
                    {...item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                  {index < cartItems.length - 1 && (
                    <div className="h-0.5 w-ful my-5 mx-3 bg-black" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
