"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    if (!query) {
      router.push(`/blog`);
    } else {
      router.push(`/blog?search=${query}`);
    }
  }, [query, router]);

  return (
    <div className="mb-3 flex justify-center mt-5">
      <div className="relative mb-4 flex w-full sm:w-[300px] md:w-[400px] flex-wrap items-stretch">
        <input
          type={"search"}
          name={"search"}
          className="relative bg-white h-10 px-5 w-full rounded-full m-0 block w-[1px] min-w-0 flex-auto rounded border-2 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder={"Zoek blog..."}
          aria-label="Search"
          aria-describedby="button-addon2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-4"
          onClick={(e) => {
            if (text) {
              e.preventDefault();
              setText("");
            }
          }}
        >
          <FaMagnifyingGlass color="black" size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
