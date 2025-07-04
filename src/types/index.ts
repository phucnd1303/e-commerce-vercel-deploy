export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface ProductVariant {
  productId: string;
  size: Size;
  color: Color;
  price: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ProductCategory = 'mens' | 'womens' | 'accessories';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Color {
  name: string;
  hex: string;
}

export type SortOption =
  | 'price-low'
  | 'price-high'
  | 'newest'
  | 'popular'
  | 'rating';

export interface FilterState {
  categories: ProductCategory[];
  sizes: Size[];
  colors: string[];
  priceRange: [number, number];
  inStock: boolean;
}

export interface AppState {
  cart: CartItem[];
  wishlist: string[];
  filters: FilterState;
  searchQuery: string;
  sortBy: SortOption;
}

export interface AppContextType {
  state: AppState;
  addToCart: (
    product: Product,
    size: Size,
    color: Color,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string, size: Size, color: Color) => void;
  updateCartQuantity: (
    productId: string,
    size: Size,
    color: Color,
    quantity: number
  ) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortOption) => void;
}
