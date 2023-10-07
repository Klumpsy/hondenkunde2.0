'use client'

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import FilterButton from './FilterButton';


const SearchAndFilter = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
  
    const toggleFilter = () => setFilterVisible(!isFilterVisible);
  
    return (
      <div className="relative flex items-center space-x-5">
        <SearchBar />
        <div className="relative"> {/* Added this div */}
          <FilterButton toggleFilter={toggleFilter} />
          {isFilterVisible && (
            <div className="absolute left-0 top-full mt-2 transform transition-transform duration-500 ease-in-out translate-x-0">
              <Filter />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default SearchAndFilter;