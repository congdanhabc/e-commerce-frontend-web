import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductSortProps {
  sortKeyList: { key: "TITLE" | "PRICE" | "CREATED_AT"; label: string }[];
  sortKeySelected: string;
  reverse: boolean;

  onSelectedSortKey: (sortKey: "TITLE" | "PRICE" | "CREATED_AT") => void;
  onChangeReverse: () => void;
}

export default function ProductSort({
  sortKeyList,
  sortKeySelected,
  reverse,

  onSelectedSortKey,
  onChangeReverse,
}: ProductSortProps) {
  return (
    <div className="relative group items-center gap-3 text-sm">
      <div className="font-medium flex items-center gap-1">
        
        <span className="text-black/60">Sắp xếp: 
        {sortKeyList.find((sortKey) => sortKey.key === sortKeySelected)?.label}
        </span>

        <button className="flex items-center justify-center w-4 h-4 ml-1 border-1 rounded-2xl bg-gray-200 cursor-pointer" onClick={onChangeReverse}>
          {reverse ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <ul
        className={`absolute right-0.5 top-full mt-2 w-25 bg-white shadow-lg rounded-md
                            opacity-0 invisible scale-95 
                            transform transition-all duration-200 ease-in-out
                            group-hover:opacity-100 group-hover:visible group-hover:scale-100 cursor-pointer`}
      >
        {sortKeyList
          .filter((sortKey) => sortKey.key !== sortKeySelected)
          .map((sortKey) => (
            <li>
              <button
                onClick={() => onSelectedSortKey(sortKey.key)}
                className="w-full block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-red-500 transition-colors"
              >
                {sortKey.label}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
