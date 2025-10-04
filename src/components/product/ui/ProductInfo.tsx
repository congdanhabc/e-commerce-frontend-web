import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import type { ShopifyProduct } from "../../../types/shopify";

interface ProductInfoProps{
    product: ShopifyProduct;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export function ProductInfo({ product, quantity, onQuantityChange }: ProductInfoProps){
    return(
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold font-inter">{product.title}</h1>

            {/* Price */}
            <div className="text-2xl font-inter">{product.priceRange.minVariantPrice.amount}</div>

            {/* Description */}
            <p className="text-sm leading-relaxed border-b pb-6">
              {product.descriptionHtml}
            </p>
          </div>

          {/* Colors */}
          {/* <div className="flex items-center gap-6">
            <span className="text-xl font-inter">Colours:</span>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-5 h-5 rounded-full ${
                    selectedColor === index ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div> */}

          {/* Size */}
          {/* <div className="flex items-center gap-6">
            <span className="text-xl font-inter">Size:</span>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                    selectedSize === size
                      ? 'bg-red-500 text-white'
                      : 'border border-gray-400 text-black hover:border-red-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}

          {/* Quantity and Buy Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-400 rounded">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="w-10 h-11 flex items-center justify-center border-r border-gray-400 hover:bg-gray-100"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="w-20 h-11 flex items-center justify-center font-medium text-xl">
                {quantity}
              </div>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-10 h-11 flex items-center justify-center bg-red-500 text-white rounded-r hover:bg-red-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-red-500 hover:bg-red-600 text-white px-12 h-11">
              Buy Now
            </div>

            <button className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-400 rounded">
            <div className="flex items-center gap-4 p-6 border-b border-gray-400">
              <Truck className="w-10 h-10" />
              <div className="space-y-2">
                <div className="font-medium">Free Delivery</div>
                <div className="text-xs underline">Enter your postal code for Delivery Availability</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6">
              <RotateCcw className="w-10 h-10" />
              <div className="space-y-2">
                <div className="font-medium">Return Delivery</div>
                <div className="text-xs">
                  Free 30 Days Delivery Returns. <span className="underline">Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}