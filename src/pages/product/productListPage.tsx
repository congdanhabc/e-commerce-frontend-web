import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Notification from "../../components/shared/Notification";
import { useProductList } from "../../hooks/useProductList";
import { type ProductsOptions } from "../../api/product-api";
import ProductListFilter from "../../components/product/ui/ProductListFilter";
import ProductListGrid from "../../components/product/ui/ProductListGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import ProductSort from "../../components/product/ui/ProductSort";

const sortKeyList: {key: 'TITLE' | 'PRICE' | 'CREATED_AT', label: string}[] = [
  {key: 'TITLE', label: 'Tên'},
  {key: 'PRICE', label: 'Giá'},
  {key: 'CREATED_AT', label: 'Mới nhất'}
]

const options: ProductsOptions = {
  tags: [],
  minPrice: undefined,
  maxPrice: undefined,
  searchTerm: undefined,
  sortKey: "CREATED_AT",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get("search");
  useEffect(() => {
    setCurrentOptions((prevCurrentOptions) => ({
      ...prevCurrentOptions,
      searchTerm: searchTermFromUrl || undefined,
    }));
  }, [searchTermFromUrl]);

  function onResetSearch() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    setSearchParams(newSearchParams);
  }

  //Cập nhật tags, min-max price
  function onApplyFilter(
    tagSelected?: string[],
    minPriceSelected?: number,
    maxPriceSelected?: number
  ) {
    setCurrentOptions((prevCurrentOptions) => ({
      ...prevCurrentOptions,
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
  function onNextPage() {
    if (pageInfo.hasNextPage) {
      setCurrentOptions((prevCurrentOptions) => ({
        ...prevCurrentOptions,
        first: 12,
        after: pageInfo.endCursor ?? undefined,
        last: undefined,
        before: undefined,
      }));
    }
  }
  function onPrevPage() {
    if (pageInfo.hasPreviousPage) {
      setCurrentOptions((prevCurrentOptions) => ({
        ...prevCurrentOptions,
        first: undefined,
        after: undefined,
        last: 12,
        before: pageInfo.startCursor ?? undefined,
      }));
    }
  }

  //Cập nhật sắp xếp
  function onSelectedSortKey(selectedSortKey: 'TITLE' | 'PRICE' | 'CREATED_AT')
  {
    setCurrentOptions((prevCurrentOptions) => ({
      ...prevCurrentOptions,
      sortKey: selectedSortKey,
      reverse: selectedSortKey === 'CREATED_AT' ? true : false
    }));
  }
  function onChangeReverse()
  {
    console.log('reverse')
    setCurrentOptions((prevCurrentOptions) => ({
      ...prevCurrentOptions,
      reverse: !(prevCurrentOptions.reverse)
    }));
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
            <h1 className="text-3xl font-bold">Sản phẩm</h1>

            {currentOptions.searchTerm ? (
              <div className="flex items-center">
                <span className="text-black/60 mr-1">Tìm kiếm sản phẩm:</span>
                <span>{currentOptions.searchTerm}</span>
                <button
                  onClick={onResetSearch}
                  className="flex items-center ml-2 text-sm font-medium text-gray-600 underline hover:text-red-500 transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-1" />
                  <span>Xóa</span>
                </button>
              </div>
            ) : (
              <div />
            )}

            <ProductSort sortKeyList={sortKeyList} sortKeySelected={currentOptions.sortKey} reverse={currentOptions.reverse} onSelectedSortKey={onSelectedSortKey} onChangeReverse={onChangeReverse} />
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
          ) : products && products.length > 0 ? (
            <>
              <ProductListGrid products={products}></ProductListGrid>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <button
                  disabled={!pageInfo.hasPreviousPage}
                  onClick={onPrevPage}
                  className="flex items-center justify-start min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={!pageInfo.hasNextPage}
                  onClick={onNextPage}
                  className="flex items-center justify-end min-w-fit h-10 px-1 gap-2 rounded-lg border-black/10 hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
