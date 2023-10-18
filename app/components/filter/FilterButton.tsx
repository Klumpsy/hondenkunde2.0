import React from "react";
import { BsFilter } from "react-icons/bs";

interface FilterButtonProps {
  toggleFilter: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ toggleFilter }) => {
  return (
    <button
      onClick={toggleFilter}
      className="rounded-full px-1 py-1 mt-4 ml:5 bg-orange text-orange flex items-center"
    >
      <BsFilter color="white" size="2em" />
    </button>
  );
};

export default FilterButton;
