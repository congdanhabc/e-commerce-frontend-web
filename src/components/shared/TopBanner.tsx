export const TopBanner = () => {
  return (
    <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span>Ngày hội mua sắm 11/11 giảm giá 25% - Nhập mã: </span>
            <span className="underline font-semibold cursor-pointer">11.11-discount</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tiếng Việt</span>
          </div>
        </div>
      </div>
  );
};
