# ShopVault — React Product Listing App

> **Assignment 10 · Full Stack Development V8**

A dynamic product listing application built with React JS demonstrating core React concepts including components, hooks, props, event handling, and list rendering.

---

## 🚀 Features

| Feature | Details |
|---|---|
| Product Grid | Responsive card layout — 1 col mobile, 2–4 cols desktop |
| Real-time Search | Case-insensitive, filters as you type |
| Category Filter | Dropdown for Electronics, Accessories, Sports, Footwear |
| Sort | Price (asc/desc) and Name (A–Z / Z–A) |
| Add to Cart | Adds items, increments if already present |
| Cart Drawer | Slide-in panel with qty controls, remove, and total |
| Toast Notifications | Feedback on every add-to-cart action |
| Responsive Design | Mobile-first, works on all screen sizes |

---

## 🗂️ Project Structure

```
react-product-listing/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component — all state lives here
    ├── components/
    │   ├── Navbar.jsx        # Top nav + cart button
    │   ├── SearchBar.jsx     # Search input
    │   ├── FilterSort.jsx    # Category + sort dropdowns
    │   ├── ProductList.jsx   # Grid + empty state
    │   ├── ProductCard.jsx   # Individual product card
    │   └── Cart.jsx          # Slide-in cart drawer
    ├── data/
    │   └── products.js       # 10 static product objects
    └── styles/
        └── App.css           # All styles (CSS variables, responsive)
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js ≥ 16
- npm ≥ 7

### Install & Start

```bash
# Clone / unzip the project
cd react-product-listing

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 React Concepts Used

### State Management (`useState`, `useEffect`, `useMemo`)

```jsx
const [cart, setCart] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [sortOrder, setSortOrder] = useState('default');
```

### Props Passing

```jsx
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
/>
```

### Array Methods

```js
// filter()
result.filter(p => p.name.toLowerCase().includes(term))
// sort()
result.sort((a, b) => a.price - b.price)
// map()
products.map(p => <ProductCard key={p.id} product={p} />)
// reduce()
cart.reduce((sum, item) => sum + item.quantity, 0)
```

### Conditional Rendering

```jsx
{cart.length === 0 ? <EmptyState /> : <CartItems />}
{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
```

---

## 📦 Product Data Structure

```js
{
  id: 1,
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  image: "https://...",
  description: "High-quality wireless headphones"
}
```

**10 products** across **4 categories**: Electronics, Accessories, Sports, Footwear.

---

## 🎨 Design

- **Theme**: Dark editorial / magazine aesthetic
- **Fonts**: Syne (display) + DM Sans (body) via Google Fonts
- **Palette**: `#0d0d0d` background · `#f0e040` accent · `#f0f0ef` text
- **Animations**: Card entrance, drawer slide-in, toast notifications

---

## ✅ Assignment Checklist

- [x] Functional React app with 10 products
- [x] 6 components (Navbar, SearchBar, FilterSort, ProductList, ProductCard, Cart)
- [x] useState for all state management
- [x] useEffect for keyboard event listener
- [x] useMemo for derived filtered/sorted list
- [x] Search by name (real-time, case-insensitive)
- [x] Filter by category
- [x] Sort by price and name
- [x] Add to Cart with count badge
- [x] Cart management (qty, remove, clear, total)
- [x] Responsive design
- [x] Clean, commented code
