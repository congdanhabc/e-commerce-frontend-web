import { Check, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface ProductListFilterProps {
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;

  onApplyFilter: (
    tagSelected?: string[],
    minPriceSelected?: number,
    maxPriceSelected?: number
  ) => void;
}

export default function ProductListFilter({
  tags,
  minPrice,
  maxPrice,
  onApplyFilter,
}: ProductListFilterProps) {
  const initialTagOptions = [
    {
      key: "electronics",
      label: "Đồ điện tử",
      checked: tags?.includes("electronics"),
    },
    {
      key: "jewelery",
      label: "Trang sức",
      checked: tags?.includes("jewelery"),
    },
    {
      key: "home-and-garden",
      label: "Nhà cửa & Đời sống",
      checked: tags?.includes("home-and-garden"),
    },
    { key: "apparel", label: "Thời trang", checked: tags?.includes("apparel") },
  ];

  const [tagOptions, setTagOptions] = useState(initialTagOptions);

  function handleTagChanges(tagOptionChanges: string) {
    setTagOptions((tagOptions) => {
      return tagOptions.map((tagOption) => {
        if (tagOption.key === tagOptionChanges) {
          return { ...tagOption, checked: !tagOption.checked };
        }
        return tagOption;
      });
    });
  }

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  function handleApplyFilter() {
    const tagSelected = tagOptions
      .filter((tagChecked) => tagChecked.checked)
      .map((tag) => tag.key);

    onApplyFilter(tagSelected, priceRange.min, priceRange.max);
  }

  return (
    <div className="w-[400px] flex-shrink-0">
      <div className="border border-black/10 rounded-2xl p-3 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Lọc sản phẩm</h2>
          <SlidersHorizontal className="w-6 h-6 text-black/40" />
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <span className="text-lg my-5">Khoảng giá</span>

          <div className="flex items-center justify-center gap-4 mt-2">   
            <div className="flex items-center">
              <span className="text-gray-700">Từ</span>
              <input
                type="integer"
                className="focus:border-primary focus:ring-primary w-25 rounded-md border border-gray-300 bg-white mx-2 px-2 py-1 text-sm text-gray-900"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: isNaN(Number(e.target.value))
                      ? 0
                      : Number(e.target.value),
                  })
                }
              />
              <span className="mr-2 font-bold">
                đ
              </span>
            </div>

            

            <div className="flex items-center">
              <span className="text-gray-700">Đến</span>
              <input
                type="integer"
                className="focus:border-primary focus:ring-primary w-25 rounded-md border border-gray-300 bg-white mx-2 px-2 py-1 text-sm text-gray-900"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: isNaN(Number(e.target.value))
                      ? 0
                      : Number(e.target.value),
                  })
                }
              />
              <span className="mr-2 font-bold">
                đ
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-5">
          {tagOptions.map((tagOption) => (
            // <div
            //   key={tagOption.key}
            //   className="flex items-center justify-start cursor-pointer"
            // >
            //   <input
            //     type="checkbox"
            //     checked={tagOption.checked}
            //     onChange={() => handleTagChanges(tagOption.key)}
            //     className=""
            //   />
            //   <span className="ml-2 text-black">{tagOption.label}</span>
            // </div>
            <button
              type="button" // Luôn thêm type="button" cho các button không dùng để submit form
              onClick={() => handleTagChanges(tagOption.key)}
              // Thuộc tính quan trọng cho accessibility
              role="checkbox"
              aria-checked={tagOption.checked}
              className="w-full flex items-center justify-start cursor-pointer group p-2 rounded-md hover:bg-gray-100"
            >
              {/* "Hộp" checkbox giả */}
              <div
                className={`relative w-5 h-5 border-2 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-200
                  ${tagOption.checked
                    ? "bg-black border-black"
                    : "bg-white border-gray-400 group-hover:border-black"
                  }`}
              >
                <Check className="text-white" />
              </div>
              
              {/* Nhãn văn bản */}
              <span className="ml-3 text-black">{tagOption.label}</span>
            </button>
          ))}
        </div>

        {/* Apply Filter Button */}
        <div className="flex justify-center w-full">
          <button
            onClick={() => handleApplyFilter()}
            className="w-fit px-25 py-3 border-1 border-black rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
          >
            Lọc sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
