"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { FiSearch, FiX } from "react-icons/fi";

interface FilterBarProps {
  baseRoute: string;
  placeholder: string;
  availableTags: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  baseRoute,
  placeholder = "Zoek...",
  availableTags,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get("search") || "");
  const [debouncedText] = useDebounce(text, 400);
  const [initialRender, setInitialRender] = useState(true);

  const activeTags = searchParams.get("tags")
    ? searchParams.get("tags")!.split(",").filter(Boolean)
    : [];

  const buildQueryString = (
    newSearch: string,
    newTags: string[],
    page = "1"
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newTags.length > 0) params.set("tags", newTags.join(","));
    params.set("page", page);
    return params.toString();
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    const qs = buildQueryString(debouncedText, activeTags);
    router.replace(`${pathname}?${qs}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  const toggleTag = (tag: string) => {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    const qs = buildQueryString(text, next);
    router.push(`${baseRoute}?${qs}`, { scroll: false });
  };

  const clearAllTags = () => {
    const qs = buildQueryString(text, []);
    router.push(`${baseRoute}?${qs}`, { scroll: false });
  };

  const clearSearch = () => {
    setText("");
    const qs = buildQueryString("", activeTags);
    router.push(`${baseRoute}?${qs}`, { scroll: false });
  };

  const hasActiveFilters = text.length > 0 || activeTags.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        {/* Search input */}
        <div
          className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200
                     focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 transition-all duration-200"
        >
          <FiSearch className="text-gray-400 text-lg flex-shrink-0" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
          />
          {text && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              aria-label="Zoekopdracht wissen"
            >
              <FiX className="text-base" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        {availableTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mr-1">
                Filter:
              </span>

              <button
                onClick={clearAllTags}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeTags.length === 0
                    ? "bg-darkBlue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Alle
              </button>

              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 capitalize ${
                    activeTags.includes(tag)
                      ? "bg-orange text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setText("");
                    clearAllTags();
                  }}
                  className="ml-auto text-xs text-gray-400 hover:text-orange transition-colors flex items-center gap-1"
                >
                  <FiX className="text-xs" />
                  Alles wissen
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
