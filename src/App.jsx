// src/App.jsx
// Root component — all state lives here, passed down via props

import React, { useState, useEffect, useMemo } from 'react';

// Components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FilterSort from './components/FilterSort';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

// Static data
import products from './data/products';

/* ─────────────────────────────────────────────
   App Component
───────────────────────────────────────────── */
function App() {
  // ── State ─────────────────────────────────
  const [cart, setCart] = useState([]);             // cart items: [...product, quantity]
  const [searchTerm, setSearchTerm] = useState(''); // live search string
  const [selectedCategory, setSelectedCategory] = useState('all'); // category filter
  const [sortOrder, setSortOrder] = useState('default'); // sort key
  const [cartOpen, setCartOpen] = useState(false);  // cart drawer visibility
  const [toasts, setToasts] = useState([]);         // notification toasts

  // ── Derived: unique category list ─────────
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    []
  );

  // ── Derived: filtered + sorted products ───
  const visibleProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by search term (case-insensitive)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    // 2. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':  return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc':   return a.name.localeCompare(b.name);
        case 'name-desc':  return b.name.localeCompare(a.name);
        default:           return a.id - b.id; // original order
      }
    });

    return result;
  }, [searchTerm, selectedCategory, sortOrder]);

  // ── Derived: cart item count ───────────────
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ── Handlers ──────────────────────────────

  /** Add a product to cart or increment quantity if already present */
  function handleAddToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Already in cart — increment
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // New item
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }

  /** Remove a product from cart entirely */
  function handleRemoveFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  /** Increase or decrease quantity; remove if it drops to 0 */
  function handleQuantityChange(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  /** Clear all items from cart */
  function handleClearCart() {
    setCart([]);
  }

  /** Reset search, filter and sort to defaults */
  function handleReset() {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortOrder('default');
  }

  /** Show a brief toast notification */
  function showToast(message) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }

  // Close cart on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setCartOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Render ────────────────────────────────
  return (
    <div className="app-wrapper">
      {/* ── Navbar ── */}
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* ── Main content ── */}
      <main className="main-content">

        {/* Hero strip */}
        <div className="hero-strip">
          <h1>Find your next <em>favourite</em></h1>
          <p>{products.length} carefully selected products across {categories.length} categories.</p>
        </div>

        {/* Controls row: search + filter/sort */}
        <div className="controls-row">
          <div className="search-wrap">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <FilterSort
            categories={categories}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortOrder}
            onReset={handleReset}
          />
        </div>

        {/* Results count */}
        <p className="results-info">
          Showing <strong>{visibleProducts.length}</strong> of {products.length} products
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>

        {/* Product grid */}
        <ProductList products={visibleProducts} onAddToCart={handleAddToCart} />
      </main>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <Cart
          cartItems={cart}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
          onClearCart={handleClearCart}
        />
      )}

      {/* ── Toast Notifications ── */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span className="dot" />
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
