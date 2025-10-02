import { Heart, Star } from "lucide-react";

export function RelatedProductCard({ 
  image, 
  discount, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviews,
  showAddToCart 
}: {
  image: string;
  discount?: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  showAddToCart?: boolean;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-gray-100 rounded p-8 mb-4 h-64 flex items-center justify-center overflow-hidden">
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 text-sm rounded">
            {discount}
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
            <Heart className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>

        <img src={image} alt={title} className="w-full h-full object-contain" />
        
        {showAddToCart && (
          <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-3 opacity-0 group-hover:opacity-100 transition-opacity">
            Add To Cart
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">{title}</h3>
        <div className="flex gap-3">
          <span className="text-red-500 font-semibold">{price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>
      </div>
    </div>
  );
}