import { Heart, ShoppingCart, Search, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-40">
            <h1 className="text-2xl font-bold">Exclusive</h1>
            <nav className="hidden md:flex items-center gap-12">
              <div className="flex flex-col items-center">
                <span className="cursor-pointer">Home</span>
                <div className="w-12 h-0.5 bg-black mt-1"></div>
              </div>
              <span className="cursor-pointer hover:text-gray-600">Contact</span>
              <span className="cursor-pointer hover:text-gray-600">About</span>
              <span className="cursor-pointer hover:text-gray-600">Sign Up</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-gray-100 rounded px-4 py-2 gap-4">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="bg-transparent text-sm outline-none w-64"
              />
              <Search className="w-5 h-5" />
            </div>
            <Heart className="w-8 h-8 cursor-pointer" />
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-8 h-8" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </div>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>
  );
};
