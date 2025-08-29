// This will be a modular setup with:
// - A DebouncedSearchInput component
// - A shared SearchBar component
// - Optional pagination or auto-suggestion support

import React, { useEffect, useState, useCallback } from "react";

// ✅ Debounced input hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// ✅ Shared SearchBar Component
export const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition"
      >
        Search
      </button>
    </div>
  );
};

// ✅ Main Search Component using debounce & shared SearchBar
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
      addHistory(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchResults = async (searchText) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}`
      );
      const data = await res.json();
      const products = data.products || [];
      if (products.length === 0) {
        setResults([{ message: "No results found." }]);
      } else {
        setResults(
          products.map((p) => ({
            title: highlightMatch(p.title, searchText),
            plainTitle: p.title,
          }))
        );
      }
    } catch (error) {
      setResults([{ message: "An error occurred. Try again." }]);
    }
  };

  const highlightMatch = (text, keyword) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };

  const addHistory = (term) => {
    const prev = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!prev.includes(term)) {
      const updated = [...prev, term];
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      setHistory(updated);
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        🔍 Smart Search
      </h1>

      <SearchBar value={query} onChange={setQuery} onSearch={() => fetchResults(query)} />

      <ul className="space-y-2">
        {results.map((res, idx) =>
          res.message ? (
            <li key={idx} className="text-gray-500 italic">
              {res.message}
            </li>
          ) : (
            <li
              key={idx}
              className="text-blue-700 hover:underline cursor-pointer"
              dangerouslySetInnerHTML={{ __html: res.title }}
            />
          )
        )}
      </ul>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-lg text-gray-700">
            Search History
          </h4>
          <button
            onClick={() => {
              localStorage.removeItem("searchHistory");
              setHistory([]);
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        </div>
        <ul className="space-y-1">
          {history.length === 0 ? (
            <li className="text-gray-400 italic text-sm">No history</li>
          ) : (
            history.map((h, i) => (
              <li
                key={i}
                onClick={() => setQuery(h)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                {h}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;

