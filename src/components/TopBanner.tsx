import { ChevronDown } from "lucide-react";

export const TopBanner = () => {
  return (
    <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            <span className="underline font-semibold cursor-pointer">ShopNow</span>
          </div>
          <div className="flex items-center gap-2">
            <span>English</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
  );
};
