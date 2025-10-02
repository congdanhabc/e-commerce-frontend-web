import { Heart, Star, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import type { ShopifyProduct } from "../../types/shopify";
import { useMemo, useState } from "react";

type ProductDetailProps = {
  product: ShopifyProduct;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const galleryImages = useMemo(() => 
    product.images.edges.map((edge) => edge.node), 
    [product]
  );

  // 2. State để lưu *chỉ số* của ảnh đang được chọn
  const [selectedImage, setSelectedImage] = useState(0);

  // 3. Một biến (hoặc useMemo) để lấy đối tượng ảnh chính dựa trên chỉ số
  const mainImage = useMemo(() => {
    return galleryImages[selectedImage] || galleryImages[0] || null;
  }, [galleryImages, selectedImage]);


  return(
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={img.url} 
                onClick={() => setSelectedImage(index)} 
                className={`flex-shrink-0 w-32 h-32 md:w-[170px] md:h-[138px] bg-gray-100 rounded cursor-pointer flex items-center justify-center p-4 transition-all duration-200 ${

                  selectedImage === index 
                    ? 'border-2 border-red-500 ring-2 ring-red-200' 
                    : 'border-2 border-transparent hover:border-gray-300'
                }`}
              >
                <img 
                  src={img.url}
                  alt={img.altText ?? `Product image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded flex items-center justify-center p-12">
            {mainImage && (
              <img 
                src={mainImage.url} 
                alt={mainImage.altText ?? product.title}
                className="max-w-full max-h-[450px] object-contain"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold font-inter">{product.title}</h1>
            
            {/* Rating */}
            {/* <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-sm text-gray-500">(150 Reviews)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-300">|</span>
                <span className="text-green-400 text-sm">In Stock</span>
              </div>
            </div> */}

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
      </div>
  );
}