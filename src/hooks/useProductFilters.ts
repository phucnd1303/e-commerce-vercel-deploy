import { useMemo } from 'react';
import { Product, FilterState, SortOption } from '../types';
import { filterProducts, sortProducts } from '../utils/product/filters';

interface UseProductFiltersProps {
  products: Product[];
  filters: FilterState;
  searchQuery: string;
  sortBy: SortOption;
}

export function useProductFilters({
  products,
  filters,
  searchQuery,
  sortBy,
}: UseProductFiltersProps) {
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, filters, searchQuery);
    return sortProducts(filtered, sortBy);
  }, [products, filters, searchQuery, sortBy]);

  const productCount = filteredAndSortedProducts.length;
  const hasProducts = productCount > 0;

  return {
    products: filteredAndSortedProducts,
    productCount,
    hasProducts,
  };
}
