// src/components/Cart.jsx
// Slide-in cart drawer: items list, qty controls, total, checkout

import React from 'react';

/**
 * Cart Component
 * Props:
 *   cartItems       {object[]}  - array of { ...product, quantity }
 *   onClose         {function}  - closes the drawer
 *   onRemove        {function}  - callback(productId) removes item fully
 *   onQuantityChange {function} - callback(productId, delta) +1 or -1
 *   onClearCart     {function}  - empties entire cart
 */
function Cart({ cartItems, onClose, onRemove, onQuantityChange, onClearCart }) {
  // Calculate totals using reduce()
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay — click to close */}
      <div className="cart-overlay" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Cart {totalItems > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 400 }}>({totalItems})</span>}
          </h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {/* Body — scrollable items */}
        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            /* Empty state */
            <div className="cart-empty">
              <div className="cart-empty__icon">🛍️</div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            /* Cart item list */
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item__img"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/68x68/1f1f1f/555?text=?`;
                  }}
                />
                <div className="cart-item__info">
                  <span className="cart-item__name">{item.name}</span>
                  <span className="cart-item__cat">{item.category}</span>
                  <div className="cart-item__bottom">
                    <span className="cart-item__price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {/* Quantity controls */}
                    <div className="cart-item__qty">
                      <button
                        className="qty-btn"
                        onClick={() => onQuantityChange(item.id, -1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onQuantityChange(item.id, +1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                  {/* Remove link */}
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — totals + checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => alert('Checkout coming soon!')}>
              Checkout →
            </button>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Cart;
