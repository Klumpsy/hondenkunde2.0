"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PaginationProps } from "./types";

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();
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
    router.push(`/artiRating?${newQueryString}`);
  };

  return (
    <div className="flex justify-center space-x-2 mt-4 mb-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-1 rounded text-white ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-darkBlue hover:bg-gray-900"
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
            className={`px-3 py-1 rounded text-white ${
              currentPage === page
                ? "bg-orange hover:bg-orange-400"
                : "bg-darkBlue hover:bg-gray-900"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-3 py-1 rounded text-white ${
          currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-darkBlue hover:bg-gray-900"
        }`}
      >
        Volgende
      </button>
    </div>
  );
};

export default Pagination;
