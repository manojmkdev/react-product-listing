// src/components/FilterSort.jsx
// Category filter dropdown + sort by price/name + reset

import React from 'react';

/**
 * FilterSort Component
 * Props:
 *   categories       {string[]}  - unique category list
 *   selectedCategory {string}    - active category ('all' or specific)
 *   sortOrder        {string}    - current sort value
 *   onCategoryChange {function}  - callback(category)
 *   onSortChange     {function}  - callback(sortOrder)
 *   onReset          {function}  - resets all filters
 */
function FilterSort({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="filter-sort">
      {/* Category filter */}
      <select
        className="fs-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Sort order */}
      <select
        className="fs-select"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products"
      >
        <option value="default">Default Order</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>

      {/* Reset button */}
      <button className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default FilterSort;
