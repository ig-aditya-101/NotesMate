import React, { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";

const SearchBar = ({ onSearch, placeholder, results = [], onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [query, setQuery] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (onSearch) onSearch(query);
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [onSearch, query]);
  return (
    <div className="relative text-body bg-bg-secondary w-full h-fit px-4 py-3 border-border-strong rounded-xl flex gap-3">
      <Search className="text-text-secondary" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsLoading(true);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="  text-text-primary w-full outline-none placeholder:text-text-muted"
        placeholder={placeholder}
      ></input>
      {isLoading && <Loader className="text-text-secondary" />}

      {/* Autocomplete Dropdown Box */}
      {showDropdown && results.length > 0 && query && (
        <div className="absolute top-full left-0 w-full mt-2 bg-bg-secondary border border-border-strong rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result._id}
              className="px-4 py-3 hover:bg-bg-primary cursor-pointer text-text-primary border-b border-border-main last:border-0"
              onClick={() => {
                setQuery(result.name);
                setShowDropdown(false);
                if (onSelect) onSelect(result); // Pass clicked note up
              }}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
