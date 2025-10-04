import { FacebookIcon, InstagramIcon, XIcon } from "lucide-react";


export const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-between">
            <div className="space-y-6 ml-50">
              <h3 className="text-2xl font-bold">SHOPBE</h3>
              <div className="space-y-4 w-60 text-gray-300">
                <p>273 An Dương Vương, Phường Chợ Quán, Hồ Chí Minh.</p>
                <p>shopbe@gmail.com</p>
                <p>0936 018 360</p>
              </div>
            </div>

            {/* <div className="space-y-6">
              <h4 className="text-xl">Account</h4>
              <div className="space-y-4 text-gray-300">
                <p className="cursor-pointer hover:text-white">My Account</p>
                <p className="cursor-pointer hover:text-white">Login / Register</p>
                <p className="cursor-pointer hover:text-white">Cart</p>
                <p className="cursor-pointer hover:text-white">Wishlist</p>
                <p className="cursor-pointer hover:text-white">Shop</p>
              </div>
            </div> */}

            <div className="space-y-6">
              
            </div>

            <div className="space-y-6 mr-50">
              <h4 className="text-xl">Chính sách và hỗ trợ</h4>
              <div className="space-y-4 text-gray-300">
                <p className="cursor-pointer hover:text-white">Chính sách bảo mật</p>
                <p className="cursor-pointer hover:text-white">Liên hệ</p>
                <p className="cursor-pointer hover:text-white">Về chúng tôi</p>
              </div>

                    
              <div className="flex gap-6 mt-6">
                <FacebookIcon className="w-6 h-6 cursor-pointer" />
                <InstagramIcon className="w-6 h-6 cursor-pointer" />
                <XIcon className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};
