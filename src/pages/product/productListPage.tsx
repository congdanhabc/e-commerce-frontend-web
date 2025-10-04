import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Notification from "../../components/notification";
import { useProductList } from "../../hooks/useProductList";
import { type ProductsOptions } from "../../api/product-api";

const categories = ["Thời trang", "Điện tử", "Trang sức", "Nội thất"];

const options : ProductsOptions = {
  collectionHandle: 'all',
};

export default function ProductListPage() {

  const {products, loading, error} = useProductList(options);
 

  console.log(products);

  if (loading) {
    return (
      <div className="min-w-full h-100 flex justify-center pt-50">
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
    );
  } else if (error) {
    console.error(error);
    const title = "Có lỗi xảy ra";
    const description = "Xuất hiện lỗi khi lấy dữ liệu sản phẩm";
    const buttonText = "Trở về trang chủ";
    const buttonLink = "/";
    const type = "error";
    return (
      <Notification
        title={title}
        description={description}
        buttonText={buttonText}
        buttonLink={buttonLink}
        type={type}
      ></Notification>
    );
  } else {
    if (!products) {
      console.error(error);
      const title = "Sản phẩm không tồn tại";
      const description = "Không tìm thấy dữ liệu sản phẩm";
      const buttonText = "Trở về trang chủ";
      const buttonLink = "/";
      const type = "info";
      return (
        <Notification
          title={title}
          description={description}
          buttonText={buttonText}
          buttonLink={buttonLink}
          type={type}
        ></Notification>
      );
    }
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-[295px] flex-shrink-0">
          <div className="border border-black/10 rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <SlidersHorizontal className="w-6 h-6 text-black/40" />
            </div>

            {/* Categories */}
            <div className="space-y-5">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-black/60">{category}</span>
                  <ChevronRight className="w-4 h-4 text-black/60 -rotate-90" />
                </div>
              ))}
            </div>

            {/* Apply Filter Button */}
            <button className="w-full rounded-full bg-black text-white hover:bg-black/90 h-12">
              Apply Filter
            </button>
          </div>
        </div>

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
          <div className="grid grid-cols-3 gap-5 mb-8">
            {products.map((product) => (
              <Link
                key={product.node.id}
                to={`/products/${product.node.handle}`}
                className="group"
              >
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center">
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{product.node.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {product.node.priceRange.minVariantPrice.amount} $
                  </span>
                  
                  {/* {product.originalPrice && (
                    <>
                      <span className="text-2xl font-bold text-black/40 line-through">
                        ${product.originalPrice}
                      </span>
                      <div className="bg-red-500/10 text-red-500 hover:bg-red-500/10 rounded-full px-3">
                        -{product.discount}%
                      </div>
                    </>
                  )} */}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <button className="gap-2 rounded-lg border-black/10">
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-0.5">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/5 font-medium">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-black/50 hover:bg-black/5">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-black/50 hover:bg-black/5">
                3
              </button>
              <span className="w-10 h-10 flex items-center justify-center text-black/50">
                ...
              </span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-black/50 hover:bg-black/5">
                8
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-black/50 hover:bg-black/5">
                9
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-black/50 hover:bg-black/5">
                10
              </button>
            </div>

            <button className="gap-2 rounded-lg border-black/10">
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
