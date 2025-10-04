import { ChevronDown } from "lucide-react";

export const TopBanner = () => {
  return (
    <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span>Ngày hội mua sắm 10/10 - Giảm giá lên đến 50%</span>
            <span className="underline font-semibold cursor-pointer">Mua sắm ngay</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tiếng Việt</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
  );
};
