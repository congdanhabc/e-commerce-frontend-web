import type { ShopifyProduct } from "../../types/shopify";
import { useMemo, useState } from "react";
import ImageGallery from "./ui/ImageGallery";
import { ProductInfo } from "./ui/ProductInfo";

type ProductDetailProps = {
  product: ShopifyProduct;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const galleryImages = useMemo(() => 
    product.images.edges.map((edge) => edge.node), 
    [product]
  );

  const [selectedImage, setSelectedImage] = useState(0);

  const mainImage = useMemo(() => {
    return galleryImages[selectedImage] || galleryImages[0] || null;
  }, [galleryImages, selectedImage]);


  return(
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ImageGallery title={product.title} images={galleryImages} mainImage={mainImage} selectedImage={selectedImage} onImageSelect={setSelectedImage} />

        <ProductInfo product={product} quantity={quantity} onQuantityChange={setQuantity} />
        
      </div>
  );
}