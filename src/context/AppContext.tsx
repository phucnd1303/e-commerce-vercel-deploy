import { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  AppState,
  AppContextType,
  Product,
  Size,
  Color,
  FilterState,
  SortOption,
} from '../types';

// Initial state
const initialState: AppState = {
  cart: [],
  wishlist: [],
  filters: {
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
    inStock: true,
  },
  searchQuery: '',
  sortBy: 'popular',
};

// Action types
type AppAction =
  | {
      type: 'ADD_TO_CART';
      payload: { product: Product; size: Size; color: Color; quantity: number };
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: { productId: string; size: Size; color: Color };
    }
  | {
      type: 'UPDATE_CART_QUANTITY';
      payload: {
        productId: string;
        size: Size;
        color: Color;
        quantity: number;
      };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortOption };

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color.name === color.name
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product, size, color, quantity }],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, color } = action.payload;
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.size === size &&
              item.color.name === color.name
            )
        ),
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color.name === color.name
              )
          ),
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId &&
          item.size === size &&
          item.color.name === color.name
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'TOGGLE_WISHLIST': {
      const productId = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    }

    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToCart = (
    product: Product,
    size: Size,
    color: Color,
    quantity = 1
  ) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, size, color, quantity },
    });
  };

  const removeFromCart = (productId: string, size: Size, color: Color) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId, size, color },
    });
  };

  const updateCartQuantity = (
    productId: string,
    size: Size,
    color: Color,
    quantity: number
  ) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { productId, size, color, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  const updateFilters = (filters: Partial<FilterState>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSortBy = (sortBy: SortOption) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const contextValue: AppContextType = {
    state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    updateFilters,
    setSearchQuery,
    setSortBy,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
