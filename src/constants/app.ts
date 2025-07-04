export const APP_NAME = 'StyleHub';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
} as const;

export const SHIPPING = {
  FREE_THRESHOLD: 50,
  STANDARD_COST: 9.99,
  TAX_RATE: 0.08,
} as const;

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  REVIEWS_PER_PAGE: 5,
} as const;

export const FILTERS = {
  DEFAULT_PRICE_RANGE: [0, 500] as [number, number],
  MAX_PRICE: 500,
} as const;
