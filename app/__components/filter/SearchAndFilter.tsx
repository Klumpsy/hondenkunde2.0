"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import FilterButton from "./FilterButton";

const SearchAndFilter = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  return (
    <div className="relative flex w-full justify-center space-x-5">
      <SearchBar />
      <div className="lg:relative filter-mobile-top">
        <FilterButton
          toggleFilter={toggleFilter}
          isFilterVisible={isFilterVisible}
        />
        <div
          className={`absolute top-full right-0 transform transition-transform duration-300 ease-in-out ${
            isFilterVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ zIndex: 500, marginTop: "5px" }}
        >
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
