// src/components/Navbar.jsx
// Sticky top nav with brand + cart icon/count

import React from 'react';

/**
 * Navbar Component
 * Props:
 *   cartCount  {number}   - total items in cart
 *   onCartOpen {function} - opens the cart drawer
 */
function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="navbar">
      {/* Brand */}
      <div>
        <div className="navbar__brand">
          Shop<span>Vault</span>
        </div>
        <div className="navbar__tagline">Curated everyday essentials</div>
      </div>

      {/* Right side */}
      <div className="navbar__right">
        {/* Cart toggle button */}
        <button className="cart-btn" onClick={onCartOpen} aria-label="Open cart">
          {/* Bag SVG icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          {/* Badge — only shows when cart has items */}
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
