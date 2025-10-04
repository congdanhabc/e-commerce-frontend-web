import { Heart, ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-100">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-40">
            <h1 className="text-2xl font-bold">SHOPBE</h1>
            <nav className="hidden md:flex items-center gap-12">
              <div className="flex flex-col items-center">
                <span className="cursor-pointer font-bold">Trang chủ</span>
                <div className="w-12 h-0.5 bg-black mt-1"></div>
              </div>
              <span className="cursor-pointer hover:text-red-600 transition-colors duration-300">Liên hệ</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors duration-300">Về chúng tôi</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-gray-100 rounded px-4 py-2 gap-4">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm" 
                className="bg-transparent text-sm outline-none w-64"
              />
              <Search className="w-5 h-5" />
            </div>

            <Link to='/' className="group cursor-pointer" >
              <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out">
                <Heart className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />
              </div>
            </Link>

            <Link to='/' className="group cursor-pointer relative" >
              <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out">
                <ShoppingCart className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />
              </div>
              <div className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </div>
            </Link>

            <Link to='/' className="group cursor-pointer" >
              <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500 transition-colors duration-500 ease-in-out">
                <User className="w-8 h-8 group-hover:w-5 group-hover:h-5 group-hover:text-white transition-all duration-600 ease-in-out" />
              </div>
            </Link>
          </div>
        </div>
      </header>
  );
};
