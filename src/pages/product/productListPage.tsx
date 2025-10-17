import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import Notification from "../../components/notification";
import { useProductList } from "../../hooks/useProductList";
import { type ProductsOptions } from "../../api/product-api";
import ProductListFilter from "../../components/product/ui/ProductListFilter";
import ProductListGrid from "../../components/product/ui/ProductListGrid";
import { useState } from "react";

const options: ProductsOptions = {
  tags: [],
  minPrice: undefined,
  maxPrice: undefined,
};

export default function ProductListPage() {
  const [currentOptions, setCurrentOptions] = useState(options);

  function onApplyFilter(
    tagSelected?: string[],
    minPriceSelected?: number,
    maxPriceSelected?: number
  ) {
    setCurrentOptions({
      tags: tagSelected,
      minPrice: minPriceSelected,
      maxPrice: maxPriceSelected,
    });
  }

  const { products, loading, error } = useProductList(options);

  if (error) console.error(error);

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <ProductListFilter
          tags={currentOptions.tags}
          minPrice={currentOptions.minPrice}
          maxPrice={currentOptions.maxPrice}
          onApplyFilter={onApplyFilter}
        ></ProductListFilter>

        {/* Products Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Casual</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-black/60">
                Showing 1-10 of 100 Products
              </span>
              <div className="flex items-center gap-1">
                <span className="text-black/60">Sort by:</span>
                <button className="font-medium flex items-center gap-1">
                  Most Popular
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}

          {loading ? (
            <div className="min-w-full h-320 flex justify-center pt-50">
              <svg
                aria-hidden="true"
                className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : error ? (
            <Notification
              title={"Có lỗi xảy ra"}
              description={"Xuất hiện lỗi khi lấy dữ liệu sản phẩm"}
              buttonText={null}
              buttonLink={null}
              type={"error"}
            ></Notification>
          ) : products ? (
            <div>
              <ProductListGrid products={products}></ProductListGrid>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <button className="flex items-center justify-start min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button className="flex items-center justify-end min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5">
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <Notification
              title={"Sản phẩm không tồn tại"}
              description={"Không tìm thấy dữ liệu sản phẩm"}
              buttonText={null}
              buttonLink={null}
              type={"info"}
            ></Notification>
          )}
        </div>
      </div>
    </div>
  );
}
