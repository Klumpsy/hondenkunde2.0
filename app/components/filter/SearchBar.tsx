'use client'
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [query] = useDebounce(text, 300);
  
    useEffect(() => {
        if(!query) {
            router.push(`/blog`)
        } else {
            router.push(`/blog?search=${query}`)
        }
    }, [query, router])

    return (
        <div className="mb-3 flex justify-center mt-5">
            <div className="relative mb-4 flex w-[400px] flex-wrap items-stretch">
                <input
                    type={'search'}
                    name={'search'}
                    className="relative bg-white h-10 px-5 pr-10 w-full rounded-full m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder={'Zoek blog...'}
                    aria-label="Search"
                    aria-describedby="button-addon2" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
    
                <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 mr-4"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;