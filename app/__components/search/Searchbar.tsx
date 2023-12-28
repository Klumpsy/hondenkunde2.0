"use client";

import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 text-sm outline-none"
      />
      <div className="p-2">
        <FiSearch size={20} className="text-gray-600" />
      </div>
    </div>
  );
};

export default SearchBar;
