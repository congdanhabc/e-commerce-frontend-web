import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import Notification from "../../components/shared/Notification";
import { useProductList } from "../../hooks/useProductList";
import { type ProductsOptions } from "../../api/product-api";
import ProductListFilter from "../../components/product/ui/ProductListFilter";
import ProductListGrid from "../../components/product/ui/ProductListGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/shared/Loading";

const options: ProductsOptions = {
  tags: [],
  minPrice: undefined,
  maxPrice: undefined,
  searchTerm: undefined,
  sortKey: 'CREATED_AT',
  reverse: true,
  first: 12,
  after: undefined,
  last: undefined,
  before: undefined,
};

export default function ProductListPage() {
  const [currentOptions, setCurrentOptions] = useState(options);
  const { products, pageInfo, loading, error } = useProductList(currentOptions);
  
  //Cập nhật Search
  const [searchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get('search') ;
  useEffect(() => 
    {
      setCurrentOptions(prevCurrentOptions => ({...prevCurrentOptions, searchTerm: searchTermFromUrl || undefined}))
    },[searchTermFromUrl])

  //Cập nhật tags, min-max price
  function onApplyFilter(
    tagSelected?: string[],
    minPriceSelected?: number,
    maxPriceSelected?: number
  ) {
    setCurrentOptions(prevCurrentOptions => ({...prevCurrentOptions,
      tags: tagSelected,
      minPrice: minPriceSelected,
      maxPrice: maxPriceSelected,
      first: 12, 
      after: undefined,
      last: undefined,
      before: undefined,
    }));
  }

  //Cập nhật phân trang
  function onNextPage()
  {
    if(pageInfo.hasNextPage)
    {
      setCurrentOptions(prevCurrentOptions => ({...prevCurrentOptions,
      first: 12,
      after: pageInfo.endCursor ?? undefined,
      last: undefined,
      before: undefined,
      }))
    }
  }
  function onPrevPage()
  {
    if(pageInfo.hasPreviousPage)
    {
      setCurrentOptions(prevCurrentOptions => ({...prevCurrentOptions,
      first: undefined,
      after: undefined,
      last: 12,
      before: pageInfo.startCursor ?? undefined,
      }))
    }
  }
  

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
            <Loading />
          ) : error ? (
            <Notification
              title={"Có lỗi xảy ra"}
              description={"Xuất hiện lỗi khi lấy dữ liệu sản phẩm"}
              buttonText={null}
              buttonLink={null}
              type={"error"}
            ></Notification>
          ) : (products && products.length > 0) ? (
            <>
              <ProductListGrid products={products}></ProductListGrid>

              {/* Pagination */}
              <div className="flex items-center justify-between">              
                <button disabled={!pageInfo.hasPreviousPage} onClick={onPrevPage}
                className="flex items-center justify-start min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                <button disabled={!pageInfo.hasNextPage} onClick={onNextPage}
                className="flex items-center justify-end min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
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
