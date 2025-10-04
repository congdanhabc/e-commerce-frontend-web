import type { ShopifyImage } from "../../../types/shopify";

interface ImageGalleryProps {
    title: string;
    images: ShopifyImage[];
    mainImage: ShopifyImage;
    selectedImage: number;
    onImageSelect: (index: number) => void;
}

export default function ImageGallery ({ title, images, mainImage, selectedImage, onImageSelect }: ImageGalleryProps) {
    return (
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            {images.map((img, index) => (
              <div
                key={img.url} 
                onClick={() => onImageSelect(index)} 
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
                alt={mainImage.altText ?? title}
                className="max-w-full max-h-[450px] object-contain"
              />
            )}
          </div>
        </div>
    )
}