"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  baseRoute: string;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  baseRoute,
  placeholder = "Zoek...",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("search") || "");
  const [query] = useDebounce(text, 500);
  const [initialRender, setInitialRender] = useState(true);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    params.set("page", "1");

    return params.toString();
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    const newQueryString = createQueryString("search", query);

    router.replace(`${pathname}?${newQueryString}`, { scroll: false });
  }, [query]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newQueryString = createQueryString("search", text);
      router.push(`${baseRoute}?${newQueryString}`);

      setTimeout(() => {
        const resultsSection = document.getElementById("search-results");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="mb-3 flex justify-center mt-5">
      <TextField
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        fullWidth
        sx={{ maxWidth: 400 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="search"
                onClick={() => {
                  const newQueryString = createQueryString("search", text);
                  router.push(`${baseRoute}?${newQueryString}`);
                }}
              >
                <FaSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
