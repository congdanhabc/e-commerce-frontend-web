import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({
  id,
  name,
  size,
  color,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4">
      {/* Product Image */}
      <div className="w-[124px] h-[124px] flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="text-black">Size: </span>
                <span className="text-black/60">{size}</span>
              </p>
              <p className="text-sm">
                <span className="text-black">Color: </span>
                <span className="text-black/60">{color}</span>
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold">${price}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-between items-end min-w-[225px]">
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-6 h-6" />
          </button>

          {/* Quantity Controls */}
          <div className="flex items-center gap-5 bg-gray-100 rounded-full px-5 py-3">
            <button
              onClick={() => onUpdateQuantity(id, -1)}
              className="hover:text-gray-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium w-3 text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(id, 1)}
              className="hover:text-gray-600 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
