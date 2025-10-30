import { ShoppingCart, Search, User, LogIn, LogOut, UserPlus2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth/useContextAuth";
import { useCart } from "../../providers/cart/useContextCart";

const navigations = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Về chúng tôi", href: "/aboutus" },
];


export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //Xử lý Search
  const [searchTerm, setSearchTerm] = useState("");
  function handleSearchProducts(event: React.FormEvent) {
    event.preventDefault();

    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) navigate("/products");
    else navigate(`/products?search=${searchTerm.trim()}`);
  }

  //Xử lý trạng thái Login
  const { isLoggedIn, onLogout } = useAuth();

  //Thông tin sản phẩm trong Cart
  const { cartContext } = useCart();
  const totalQuantity = cartContext?.totalQuantity !== undefined ? cartContext.totalQuantity : 0;

  return (
    <header className="border-b sticky top-0 bg-white z-100 w-full">
      <div className="container px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-20">
          <h1 className="text-2xl font-bold">SHOPBE</h1>
          <nav>
            <ul className="hidden md:flex items-center gap-12">
              {navigations.map((nav) =>
                location.pathname == nav.href ? (
                  <li className="flex flex-col items-center">
                    <Link to={nav.href} className="cursor-pointer font-bold">
                      {nav.label}
                    </Link>
                    <div className="w-12 h-0.5 bg-black mt-1"></div>
                  </li>
                ) : (
                  <li>
                    <Link
                      to={nav.href}
                      className="cursor-pointer hover:text-red-600 transition-colors duration-300"
                    >
                      {nav.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <div className="flex gap-6 items-center">
          <form
            onSubmit={handleSearchProducts}
            className="flex items-center bg-gray-100 rounded px-4 py-2 gap-4 group"
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="bg-transparent text-sm outline-none w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              type="submit"
              className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer group-hover:bg-red-500 transition-colors duration-300 ease-in-out"
            >
              <Search className="w-6 h-6 group-hover:w-4 group-hover:h-4 group-hover:text-white transition-all duration-400 ease-in-out" />
            </button>
          </form>

          <nav>
            <ul className="flex items-center gap-8">
              {/* <li className="group cursor-pointer">
                <Link
                  to={isLoggedIn ? `/` : `/login`}
                  className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out"
                >
                  <Heart className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />
                </Link>
              </li> */}

              <li className="group cursor-pointer relative">
                <Link
                  to={isLoggedIn ? `/cart` : `/login`}
                  className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out"
                >
                  <ShoppingCart className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />

                  { (totalQuantity > 0) && (
                    <div className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalQuantity}
                    </div>
                  )}
                </Link>
              </li>

              <li className="relative group cursor-pointer">
                <Link
                  to={isLoggedIn ? `/` : `/login`}
                  className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out"
                >
                  <User className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />
                </Link>

                <ul
                  className="absolute right-0.5 top-full mt-2 w-36 bg-white shadow-lg rounded-md
                            opacity-0 invisible scale-95 
                            transform transition-all duration-200 ease-in-out
                            group-hover:opacity-100 group-hover:visible group-hover:scale-100 z-1000"
                >
                  {isLoggedIn ? (
                    <li>
                      <button
                        onClick={() => onLogout()}
                        className="block w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-red-500 transition-colors"
                      >
                        <span className="flex">
                          <LogOut className="text-sm mr-1"  />
                          Đăng xuất
                        </span>
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-red-500 transition-colors"
                        >
                            <span className="flex">
                              <LogIn className="text-sm mr-1" />
                               Đăng nhập
                            </span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-red-500 transition-colors"
                        >
                            <span className="flex">
                              <UserPlus2 className="text-sm mr-1" />
                               Đăng ký
                            </span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
