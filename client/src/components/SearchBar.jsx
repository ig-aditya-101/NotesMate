import React, { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";

const SearchBar = ({ onSearch, placeholder }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
     if (onSearch) onSearch(query)
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [onSearch, query]);
  return (
    <div className="text-body bg-bg-secondary w-full h-fit px-4 py-3 border-border-strong rounded-xl flex gap-3">
      <Search className="text-text-secondary" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsLoading(true);
        }}
        className="  text-text-primary w-full outline-none placeholder:text-text-muted"
        placeholder={placeholder}
      ></input>
      {isLoading && <Loader className="text-text-secondary" />}
    </div>
  );
};

export default SearchBar;
