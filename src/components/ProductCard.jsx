// src/components/ProductCard.jsx
// Individual product card with image, details and add-to-cart button

import React, { useState } from 'react';

/**
 * ProductCard Component
 * Props:
 *   product    {object}   - product data object
 *   onAddToCart {function} - callback(product)
 */
function ProductCard({ product, onAddToCart }) {
  // Local flash state to give visual feedback on add
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(product);
    setAdded(true);
    // Reset button label after 1.2s
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="product-card">
      {/* Product image */}
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder on broken image
            e.target.src = `https://via.placeholder.com/400x300/1f1f1f/555?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {/* Category badge */}
        <span className="product-card__category">{product.category}</span>
      </div>

      {/* Card body */}
      <div className="product-card__body">
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__desc">{product.description}</p>

        {/* Footer: price + CTA */}
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <button
            className={`add-to-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
