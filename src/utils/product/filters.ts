import { Product, FilterState, SortOption } from '../../types';

export function filterProducts(
  products: Product[],
  filters: FilterState,
  searchQuery: string
): Product[] {
  let filtered = products;

  // Search query filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((product) =>
      filters.categories.includes(product.category)
    );
  }

  // Size filter
  if (filters.sizes.length > 0) {
    filtered = filtered.filter((product) =>
      product.sizes.some((size) => filters.sizes.includes(size))
    );
  }

  // Color filter
  if (filters.colors.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors.some((color) => filters.colors.includes(color.name))
    );
  }

  // Price range filter
  filtered = filtered.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  // In stock filter
  if (filters.inStock) {
    filtered = filtered.filter((product) => product.inStock);
  }

  return filtered;
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);

    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);

    case 'newest':
      return sorted.sort((a, b) => {
        // Prioritize new items
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });

    case 'popular':
      return sorted.sort((a, b) => {
        // Prioritize popular items, then by review count
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return b.reviewCount - a.reviewCount;
      });

    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);

    default:
      return sorted;
  }
}

export function getUniqueCategories(products: Product[]): string[] {
  const categories = products.map((product) => product.category);
  return Array.from(new Set(categories));
}

export function getUniqueSizes(products: Product[]): string[] {
  const sizes = products.flatMap((product) => product.sizes);
  return Array.from(new Set(sizes));
}

export function getUniqueColors(products: Product[]): string[] {
  const colors = products.flatMap((product) =>
    product.colors.map((c) => c.name)
  );
  return Array.from(new Set(colors));
}

export function getUniqueSubcategories(
  products: Product[],
  category?: string
): string[] {
  const filtered = category
    ? products.filter((product) => product.category === category)
    : products;

  const subcategories = filtered.map((product) => product.subcategory);
  return Array.from(new Set(subcategories));
}

export function getPriceRange(products: Product[]): [number, number] {
  if (products.length === 0) return [0, 500];

  const prices = products.map((product) => product.price);
  return [Math.min(...prices), Math.max(...prices)];
}
