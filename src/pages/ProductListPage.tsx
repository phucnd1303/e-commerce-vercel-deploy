import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '../components/product';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  filterProducts,
  sortProducts,
  getUniqueCategories,
  getUniqueSizes,
  getUniqueColors,
} from '../utils/productUtils';
import { ProductCategory, Size, SortOption } from '../types';

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, updateFilters, setSortBy } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory;
    const sort = searchParams.get('sort') as SortOption;

    if (category && !state.filters.categories.includes(category)) {
      updateFilters({ categories: [category] });
    }

    if (sort && sort !== state.sortBy) {
      setSortBy(sort);
    }
  }, [
    searchParams,
    state.filters.categories,
    state.sortBy,
    updateFilters,
    setSortBy,
  ]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, state.filters, state.searchQuery);
    return sortProducts(filtered, state.sortBy);
  }, [state.filters, state.searchQuery, state.sortBy]);

  const handleCategoryFilter = (category: ProductCategory) => {
    const newCategories = state.filters.categories.includes(category)
      ? state.filters.categories.filter((c) => c !== category)
      : [...state.filters.categories, category];

    updateFilters({ categories: newCategories });

    // Update URL
    if (newCategories.length === 1) {
      setSearchParams((prev) => {
        prev.set('category', newCategories[0]);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete('category');
        return prev;
      });
    }
  };

  const handleSizeFilter = (size: Size) => {
    const newSizes = state.filters.sizes.includes(size)
      ? state.filters.sizes.filter((s) => s !== size)
      : [...state.filters.sizes, size];

    updateFilters({ sizes: newSizes });
  };

  const handleColorFilter = (color: string) => {
    const newColors = state.filters.colors.includes(color)
      ? state.filters.colors.filter((c) => c !== color)
      : [...state.filters.colors, color];

    updateFilters({ colors: newColors });
  };

  const handleSortChange = (sortBy: SortOption) => {
    setSortBy(sortBy);
    setSearchParams((prev) => {
      prev.set('sort', sortBy);
      return prev;
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilters({ priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    updateFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 500],
      inStock: true,
    });
    setSearchParams({});
  };

  const availableCategories = getUniqueCategories(products);
  const availableSizes = getUniqueSizes(products);
  const availableColors = getUniqueColors(products);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              {state.searchQuery
                ? `Search Results for "${state.searchQuery}"`
                : 'All Products'}
            </h1>
            <p className="text-text-muted mt-2">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* View Mode & Sort */}
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg p-1 shadow-soft border border-neutral-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-soft' : 'text-text-muted hover:text-primary-600 hover:bg-primary-50'} transition-all duration-200`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-soft' : 'text-text-muted hover:text-primary-600 hover:bg-primary-50'} transition-all duration-200`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="btn-secondary flex items-center space-x-2">
                <span>Sort by</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-large opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <button
                  onClick={() => handleSortChange('popular')}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 first:rounded-t-xl transition-all duration-200 ${state.sortBy === 'popular' ? 'text-primary-600 bg-primary-50' : 'text-text-secondary'}`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-all duration-200 ${state.sortBy === 'newest' ? 'text-primary-600 bg-primary-50' : 'text-text-secondary'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSortChange('price-low')}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-all duration-200 ${state.sortBy === 'price-low' ? 'text-primary-600 bg-primary-50' : 'text-text-secondary'}`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange('price-high')}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-all duration-200 ${state.sortBy === 'price-high' ? 'text-primary-600 bg-primary-50' : 'text-text-secondary'}`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSortChange('rating')}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 last:rounded-b-xl transition-all duration-200 ${state.sortBy === 'rating' ? 'text-primary-600 bg-primary-50' : 'text-text-secondary'}`}
                >
                  Highest Rated
                </button>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn-secondary flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div
            className={`md:block ${isFilterOpen ? 'block' : 'hidden'} w-full md:w-64 flex-shrink-0`}
          >
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium hover:bg-primary-50 px-2 py-1 rounded transition-all duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {availableCategories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={state.filters.categories.includes(
                          category as ProductCategory
                        )}
                        onChange={() =>
                          handleCategoryFilter(category as ProductCategory)
                        }
                        className="rounded bg-white border-neutral-300 text-primary-600 focus:ring-primary-500/20"
                      />
                      <span className="ml-2 text-text-muted capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeFilter(size as Size)}
                      className={`py-2 px-3 rounded-lg border transition-all duration-300 ${
                        state.filters.sizes.includes(size as Size)
                          ? 'bg-primary-600 border-primary-600 text-white shadow-soft'
                          : 'bg-white border-neutral-300 text-text-muted hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3">Color</h4>
                <div className="space-y-2">
                  {availableColors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={state.filters.colors.includes(color)}
                        onChange={() => handleColorFilter(color)}
                        className="rounded bg-white border-neutral-300 text-primary-600 focus:ring-primary-500/20"
                      />
                      <span className="ml-2 text-text-muted">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={state.filters.priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange(
                          Number(e.target.value),
                          state.filters.priceRange[1]
                        )
                      }
                      className="input-field w-20 text-sm"
                      placeholder="Min"
                    />
                    <span className="text-text-muted">-</span>
                    <input
                      type="number"
                      value={state.filters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(
                          state.filters.priceRange[0],
                          Number(e.target.value)
                        )
                      }
                      className="input-field w-20 text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={state.filters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceRangeChange(
                        state.filters.priceRange[0],
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-primary-600"
                  />
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.filters.inStock}
                    onChange={(e) =>
                      updateFilters({ inStock: e.target.checked })
                    }
                    className="rounded bg-white border-neutral-300 text-primary-600 focus:ring-primary-500/20"
                  />
                  <span className="ml-2 text-text-muted">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No products found
                </h3>
                <p className="text-text-muted mb-6">
                  Try adjusting your filters or search terms to find what you're
                  looking for.
                </p>
                <button onClick={clearAllFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsFilterOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Filters
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-text-muted hover:text-text-primary"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {/* Same filter content as desktop */}
                {/* ... Filter content would be repeated here ... */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
