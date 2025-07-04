# StyleHub - Premium Apparel E-commerce

A modern, dark-themed e-commerce application built with React, TypeScript, and Tailwind CSS. StyleHub offers a premium shopping experience for apparel and accessories with a clean, minimalist design and colorful accents.

## 🌟 Features

### Core Functionality
- **Homepage**: Hero section, featured products, new arrivals, and category showcase
- **Product Listing**: Advanced filtering, sorting, search, and grid/list view toggle
- **Product Details**: Image gallery, size/color selection, reviews, and related products
- **Shopping Cart**: Real-time updates, quantity controls, and order summary
- **User Authentication**: Login/signup with frontend simulation
- **User Profile**: Account overview, order history, and settings

### Product Features
- **Filtering**: By category, size, color, price range, and stock status
- **Sorting**: By popularity, price, newest arrivals, and ratings
- **Search**: Real-time product search across names, descriptions, and tags
- **Wishlist**: Save favorite products for later
- **Reviews**: Customer reviews with ratings and review submission

### UI/UX Features
- **Dark Theme**: Modern dark design with colorful accents
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Modern Icons**: Lucide React icons throughout the interface

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **State Management**: React Context API with useReducer
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9) for main actions and highlights
- **Accent**: Green tones (#10b981) for success states and secondary actions
- **Dark**: Neutral grays (#0f172a to #64748b) for backgrounds and text
- **Support**: Red for errors, Yellow for warnings, Purple for special features

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main navigation and search
│   ├── Footer.tsx      # Footer with links and newsletter
│   └── ProductCard.tsx # Product display card
├── pages/              # Page-level components
│   ├── HomePage.tsx    # Landing page
│   ├── ProductListPage.tsx # Product listing with filters
│   ├── ProductDetailPage.tsx # Individual product page
│   ├── CartPage.tsx    # Shopping cart
│   ├── LoginPage.tsx   # User login
│   ├── SignupPage.tsx  # User registration
│   └── ProfilePage.tsx # User profile and account
├── context/            # React Context for state management
│   ├── AppContext.tsx  # Main app state (cart, wishlist, filters)
│   └── AuthContext.tsx # Authentication state
├── data/               # Mock data and constants
│   └── mockData.ts     # Product data and reviews
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   └── productUtils.ts # Product filtering, sorting, and formatting
├── App.tsx             # Main app component with routing
├── main.tsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-demo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier

## 📱 Features Overview

### Homepage
- Hero section with call-to-action buttons
- New arrivals showcase
- Popular products section
- Category navigation cards
- Newsletter signup
- Trust indicators (shipping, returns, security)

### Product Listing
- Grid and list view modes
- Advanced filtering sidebar
- Sort options (price, popularity, rating, newest)
- Search functionality
- URL parameter support for filters
- Mobile-responsive filter overlay

### Product Detail Page
- Image gallery with thumbnail navigation
- Size and color selection
- Quantity controls
- Add to cart and wishlist functionality
- Product reviews and rating system
- Tabbed content (description, reviews, shipping)
- Related products section
- Breadcrumb navigation

### Shopping Cart
- Item quantity controls
- Price calculations with tax and shipping
- Remove items functionality
- Order summary
- Empty cart state
- Shipping threshold indicator

### User Authentication
- Login and signup forms
- Form validation
- Loading states
- Social login buttons (UI only)
- Password visibility toggle

### User Profile
- Account overview with statistics
- Mock order history
- Account information editing
- Navigation sidebar
- Wishlist and cart links

## 🎯 Mock Data

The application includes comprehensive mock data:

- **15 Products** across 3 categories (Men's, Women's, Accessories)
- **Multiple product images** from Unsplash
- **Size variations** (XS, S, M, L, XL, XXL)
- **Color options** with hex values
- **Customer reviews** with ratings and verified purchase badges
- **Product ratings** and review counts

## 🔧 Customization

### Adding New Products
Edit `src/data/mockData.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  originalPrice: 129.99, // Optional
  category: 'mens' | 'womens' | 'accessories',
  subcategory: 'T-Shirts',
  images: ['image-url-1', 'image-url-2'],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [{ name: 'Black', hex: '#000000' }],
  inStock: true,
  isNew: true, // Optional
  isPopular: false, // Optional
  rating: 4.5,
  reviewCount: 127,
  tags: ['casual', 'cotton'],
}
```

### Styling Customization
The design system is built with Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your primary colors */ },
      accent: { /* your accent colors */ },
      dark: { /* your dark theme colors */ }
    }
  }
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

## 🤝 Contributing

This is a demo project, but suggestions and improvements are welcome! Please feel free to submit issues or pull requests.

## 📸 Screenshots

### Homepage
- Hero section with gradient text and product images
- Feature highlights with icons
- Product showcases and category cards

### Product Listing
- Filter sidebar with category, size, color, and price options
- Grid view with product cards showing images, ratings, and prices
- Sort dropdown and view mode toggle

### Product Detail
- Large image gallery with thumbnails
- Interactive size and color selection
- Reviews section with rating stars
- Related products carousel

### Shopping Cart
- Item list with quantity controls and remove buttons
- Order summary with shipping and tax calculations
- Empty cart state with call-to-action

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📞 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS 
