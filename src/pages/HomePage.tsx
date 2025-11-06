import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/product-api';
import type { ShopifyProductEdge } from '../types/shopify';
import ProductListGrid from '../components/product/ui/ProductListGrid';
import Loading from '../components/shared/Loading';

const ProductSection = ({
  category,
  title,
  products,
  viewAllLink = "/products"
}: {
  category: string;
  title:string;
  products: ShopifyProductEdge[];
  viewAllLink?: string;
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">{category}</span>
          </div>
          <h2 className="text-4xl font-semibold">{title}</h2>
        </div>
        <Link to={viewAllLink}>
          <button className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded">
            Xem tất cả
          </button>
        </Link>
      </div>
        <ProductListGrid products={products} />
    </section>
  );
};

// 4. COMPONENT TRANG CHỦ CHÍNH
export default function HomePage() {
  // State để lưu trữ dữ liệu sản phẩm
  const [bestSellers, setBestSellers] = useState<ShopifyProductEdge[]>([]);
  const [exploreProducts, setExploreProducts] = useState<ShopifyProductEdge[]>([]);
  const [electronics, setElectronics] = useState<ShopifyProductEdge[]>([]);
  const [jewelery, setJewelery] = useState<ShopifyProductEdge[]>([]);
  const [homeAndGarden, setHomeAndGarden] = useState<ShopifyProductEdge[]>([]);
  const [apparel, setApparel] = useState<ShopifyProductEdge[]>([]);

  // State cho trạng thái tải và lỗi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect để gọi API khi component được render lần đầu
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        setLoading(true);
        // Gọi tất cả API song song để tăng tốc độ tải trang
        const [
          bestSellersData,
          exploreData,
          electronicsData,
          jeweleryData,
          homeData,
          apparelData,
        ] = await Promise.all([
          getProducts({ collectionHandles: ['best-seller'], sortKey: 'BEST_SELLING', reverse: false, first: 4 }),
          getProducts({ collectionHandles: ['explore'], sortKey: 'CREATED_AT', reverse: true, first: 8 }),
          getProducts({ tags: ['electronics'], sortKey: 'CREATED_AT', reverse: true, first: 4 }),
          getProducts({ tags: ['jewelery'], sortKey: 'CREATED_AT', reverse: true, first: 4 }),
          getProducts({ tags: ['home-and-garden'], sortKey: 'CREATED_AT', reverse: true, first: 4 }),
          getProducts({ tags: ['apparel'], sortKey: 'CREATED_AT', reverse: true, first: 4 }),
        ]);

        // Cập nhật state với dữ liệu nhận được
        setBestSellers(bestSellersData.edges);
        setExploreProducts(exploreData.edges);
        setElectronics(electronicsData.edges);
        setJewelery(jeweleryData.edges);
        setHomeAndGarden(homeData.edges);
        setApparel(apparelData.edges);

      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  // Hiển thị thông báo đang tải
  if (loading) {
    return <div className="container mx-auto py-10 text-center"><Loading /></div>;
  }

  // Hiển thị thông báo lỗi
  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

  // Render giao diện chính khi có dữ liệu
  return (
    <div className="container mx-auto py-10">
      {/* Hero Section */}
      <div className="flex gap-8">
        <div className="flex-1 bg-black text-white rounded relative overflow-hidden h-96">
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="p-16 space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d8852db2acfcedd1f6d962179ae2e5fb03ef7b64?width=80"
                  alt="Apple"
                  className="w-10 h-12"
                />
                <span>iPhone 14 Series</span>
              </div>
              <h2 className="text-5xl font-semibold leading-tight">
                Giảm giá đến
                <br />
                10% Voucher
              </h2>
              <Link to="/products" className="flex items-center gap-2 cursor-pointer">
                <span className="underline">Mua ngay</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex-1 flex justify-end pr-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fa65553987dae8b0797754c9f58adf1fcb3d93b2?width=992"
                alt="iPhone"
                className="w-auto h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Các phần sản phẩm được tạo động */}
      <ProductSection category="Trong Tháng Này" title="Sản Phẩm Bán Chạy" products={bestSellers} />
      <ProductSection category="Đồ Điện Tử" title="Công Nghệ Nổi Bật" products={electronics} />
      <ProductSection category="Trang Sức" title="Lấp Lánh Kiêu Sa" products={jewelery} />
      <ProductSection category="Nhà Cửa & Đời Sống" title="Không Gian Sống Động" products={homeAndGarden} />
      <ProductSection category="Thời Trang" title="Phong Cách Dẫn Đầu" products={apparel} />
      <ProductSection category="Sản Phẩm Của Chúng Tôi" title="Khám Phá Sản Phẩm" products={exploreProducts} />

      {/* Services */}
      <section className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl border-2 border-gray-400">
                🚚
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">GIAO HÀNG MIỄN PHÍ & NHANH CHÓNG</h3>
                <p className="text-gray-600">Miễn phí giao hàng cho mọi đơn hàng</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl border-2 border-gray-400">
                🎧
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">HỖ TRỢ KHÁCH HÀNG 24/7</h3>
                <p className="text-gray-600">Hỗ trợ khách hàng thân thiện 24/7</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl border-2 border-gray-400">
                ✅
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">ĐẢM BẢO HOÀN TIỀN</h3>
                <p className="text-gray-600">Chúng tôi hoàn tiền trong vòng 30 ngày</p>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}