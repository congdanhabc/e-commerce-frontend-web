import type { ShopifyProductEdge } from "../../types/shopify";

type ProductListProps = {
  products: ShopifyProductEdge[];
};

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="text-center py-10">Không tìm thấy sản phẩm bạn cần tìm</p>;
  }

  return{
    
  };
}