// src/components/ProductList.jsx
// Renders the filtered/sorted product grid or an empty state

import React from 'react';
import ProductCard from './ProductCard';

/**
 * ProductList Component
 * Props:
 *   products    {object[]}  - filtered + sorted product array
 *   onAddToCart {function}  - callback(product)
 */
function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {/* Conditional rendering: grid or empty state */}
      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
