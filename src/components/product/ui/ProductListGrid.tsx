import { Link } from "react-router-dom";
import type { ShopifyProductEdge } from "../../../types/shopify";

type ProductListGridProps = {
  products: ShopifyProductEdge[];
};

export default function ProductListGrid({ products }: ProductListGridProps) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {products.map((product) => (
        <Link
          key={product.node.id}
          to={`/products/${product.node.handle}`}
          className="group flex flex-col border-1 rounded-2xl border-white hover:border-black transition-colors duration-200"
        >
          <div className="bg-gray-100 rounded-t-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center">
            <img
              src={product.node.images.edges[0].node.url}
              alt={product.node.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* <h3 className="font-bold text-lg mb-2">{product.node.title}</h3>
                <span className="text-2xl font-bold">
                    {product.node.priceRange.minVariantPrice.amount.toLocaleString()} đ
                </span> */}
          <div className="flex flex-col flex-grow px-2">
            <h3 className="font-bold text-lg mb-2 flex-grow">
              {product.node.title}
            </h3>

            <span className="text-xl font-bold-">
              {formatter.format(
                Number(product.node.priceRange.minVariantPrice.amount)
              )}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
