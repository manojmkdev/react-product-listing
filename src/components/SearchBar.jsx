// src/components/SearchBar.jsx
// Real-time product search input

import React from 'react';

/**
 * SearchBar Component
 * Props:
 *   searchTerm    {string}   - current search value
 *   onSearchChange {function} - callback(newValue)
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      {/* Search icon */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        placeholder="Search products…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />

      {/* Clear button — only visible when there's input */}
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
