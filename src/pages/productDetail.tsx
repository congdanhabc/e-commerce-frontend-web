import { useParams } from "react-router-dom";
import { RelatedProductCard } from "../components/product/RelatedProductCard";
import { useProductDetail } from "../hooks/useProductDetail";
import ProductDetail from "../components/product/ProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle as string;
  const {product, loading, error} = useProductDetail(handle);

  // console.log(product);
    if (!product) {
    return <div>Product not found.</div>;
  }

  return (
      <div className="container mx-auto px-4 pb-20">
        
        <ProductDetail product={product} /> 

        {/* Related Items */}
        <section className="mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">Related Item</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RelatedProductCard 
              image="https://api.builder.io/api/v1/image/assets/TEMP/07edb8073dcce74da29c524affa1c958d18d80b8?width=344"
              discount="-40%"
              title="HAVIT HV-G92 Gamepad"
              price="$120"
              originalPrice="$160"
              rating={5}
              reviews={88}
            />
          </div>
        </section>
      </div>
  );
}

