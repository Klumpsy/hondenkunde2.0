'use client'

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import FilterButton from './FilterButton';


const SearchAndFilter = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  return (
    <div className="relative flex w-full justify-center space-x-5">
      <SearchBar />
      <div className="lg:relative filter-mobile-top"> {/* Adjusted position */}
        <FilterButton toggleFilter={toggleFilter} />
        {isFilterVisible && (
          <div className={`absolute top-full right-0 transform transition-transform duration-300 ease-in-out ${isFilterVisible ? 'translate-x-0' : 'translate-x-full'}`} style={{zIndex:500, marginTop: '5px'}}>
            <Filter />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
