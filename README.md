# ShopVault

A dynamic, full-featured product listing application built with React 18. ShopVault demonstrates modern React patterns including component composition, controlled state management, real-time filtering, and a fully responsive dark-themed UI.

&nbsp;

## ✦ Live Demo

> [Add your Vercel / Netlify link here]

&nbsp;

## Features

- **Product Grid** — Responsive card layout powered by CSS Grid; adapts from 2 columns on mobile to 4 on wide screens
- **Real-time Search** — Instant, case-insensitive filtering as you type with a one-click clear
- **Category Filter** — Dropdown to isolate Electronics, Accessories, Sports, or Footwear
- **Smart Sort** — Sort by price (low → high / high → low) or name (A → Z / Z → A)
- **Cart System** — Slide-in drawer with quantity controls, per-item removal, running total, and free-shipping threshold
- **Toast Notifications** — Non-blocking feedback on every cart interaction
- **Keyboard Accessible** — Escape key closes the cart; all interactive elements labelled for screen readers
- **Fully Responsive** — Mobile-first layout tested down to 375px

&nbsp;

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 4 |
| Styling | Plain CSS with custom properties |
| Fonts | Syne · DM Sans (Google Fonts) |
| Images | Unsplash (CDN) |
| State | useState · useEffect · useMemo |

No UI library dependencies — every component is hand-built.

&nbsp;

## Project Structure

```
shopvault/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx                 # Root — all shared state lives here
    ├── main.jsx                # React DOM entry point
    ├── components/
    │   ├── Navbar.jsx          # Sticky header + cart toggle
    │   ├── SearchBar.jsx       # Controlled search input
    │   ├── FilterSort.jsx      # Category + sort dropdowns
    │   ├── ProductList.jsx     # Grid container + empty state
    │   ├── ProductCard.jsx     # Individual product card
    │   └── Cart.jsx            # Slide-in cart drawer
    ├── data/
    │   └── products.js         # 10 static product records
    └── styles/
        └── App.css             # Global styles + CSS variables
```

&nbsp;

## Getting Started

**Prerequisites:** Node.js ≥ 16, npm ≥ 7

```bash
# 1. Clone the repo
git clone https://github.com/your-username/shopvault.git
cd shopvault

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — hot module reload is enabled.

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

&nbsp;

## React Concepts Demonstrated

**State Management**
```jsx
const [cart, setCart]                     = useState([]);
const [searchTerm, setSearchTerm]         = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [sortOrder, setSortOrder]           = useState('default');
```

**Derived State with useMemo** — the visible product list is computed only when its dependencies change, avoiding unnecessary recalculations on every render.

```jsx
const visibleProducts = useMemo(() => {
  let result = [...products];
  if (searchTerm)            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
  result.sort((a, b) => { /* price / name sort logic */ });
  return result;
}, [searchTerm, selectedCategory, sortOrder]);
```

**Props + Callbacks Pattern**
```jsx
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
/>
```

**Array Methods**
```js
map()    // render product cards
filter() // search + category filtering
sort()   // price and name ordering
reduce() // cart total + item count
```

**Conditional Rendering**
```jsx
{cart.length === 0 ? <EmptyState /> : cart.map(item => <CartItem ... />)}
{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
```

&nbsp;

## Data Model

```js
{
  id:          1,
  name:        "Wireless Headphones",
  price:       79.99,
  category:    "Electronics",
  image:       "https://...",
  description: "Premium wireless headphones with ANC and 30hr battery."
}
```

10 products across 4 categories: **Electronics · Accessories · Sports · Footwear**

&nbsp;

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 768px | Auto-fill grid (min 260px columns) |
| ≤ 768px | Stacked controls, smaller cards |
| ≤ 480px | Forced 2-column grid |

The cart drawer uses `min(420px, 100vw)` so it never overflows on any device.

&nbsp;

## License

MIT — free to use, modify, and distribute.
