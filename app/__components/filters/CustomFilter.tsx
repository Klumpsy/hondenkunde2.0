"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { MdExpandMore } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { CustomFilterProps } from "../../definitions/interface/CustomFilterPropsInterface";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectionChange = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  //https://www.youtube.com/watch?v=pUNSHPyVryU
  return (
    <div className="relative w-64 ml-6">
      <button
        id="dropdownDefaultButton"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        {title}
        <MdExpandMore className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 dark:bg-gray-700 w-full">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectionChange(option.value)}
                  className={`block w-full text-left px-4 py-2 flex items-center ${
                    selectedOption === option.value
                      ? "text-orange text-bold"
                      : ""
                  } hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                >
                  {selectedOption === option.value && (
                    <FaCheck className="mr-2" />
                  )}
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFilter;
