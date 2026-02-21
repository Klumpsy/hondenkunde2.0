"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { PaginationProps } from "./types";

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    const newQueryString = createQueryString("page", page.toString());
    router.push(`${pathname}?${newQueryString}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1.5 mt-8 mb-8">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-200 hover:border-orange hover:text-orange"
        }`}
      >
        Vorige
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-orange text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-orange hover:text-orange"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-200 hover:border-orange hover:text-orange"
        }`}
      >
        Volgende
      </button>
    </div>
  );
};

export default Pagination;
