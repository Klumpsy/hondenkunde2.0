import React from "react";
import { BsFilter } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

interface FilterButtonProps {
  toggleFilter: () => void;
  isFilterVisible: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  toggleFilter,
  isFilterVisible,
}) => {
  return (
    <button
      onClick={toggleFilter}
      className="rounded-full px-1 py-1 mt-4 ml:5 bg-orange text-orange flex items-center"
    >
      {isFilterVisible ? (
        <RxCross2 color="white" size={32} />
      ) : (
        <BsFilter color="white" size={32} />
      )}
    </button>
  );
};

export default FilterButton;
