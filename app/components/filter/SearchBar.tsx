"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("search") || "");
  const [query] = useDebounce(text, 300);

  const handleSearch = (searchQuery: string) => {
    const tags = searchParams.get("tags") || "";
    const queryParams = new URLSearchParams();
    if (tags) {
      queryParams.set("tags", tags);
    }
    queryParams.set("search", searchQuery);
    router.push(`${baseRoute}?${queryParams.toString()}`);

    const resultsSection = document.getElementById("search-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      router.push(baseRoute);
    }
  }, [query, router, searchParams, baseRoute]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text) {
      e.preventDefault();
      handleSearch(text);
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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <FaSearch />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
