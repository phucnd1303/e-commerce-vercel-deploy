import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { ProductCard } from '../components/product';
import { Button } from '../components/ui';
import { products } from '../data/mockData';

const HomePage: React.FC = () => {
  // const featuredProducts = products
  //   .filter((p) => p.isNew || p.isPopular)
  //   .slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background-50 via-background-100 to-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-accent-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Elevate Your
                <span className="text-gradient"> Style</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                Discover premium apparel and accessories that define your unique
                style. From everyday essentials to statement pieces, find your
                perfect look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  as={Link}
                  to="/products"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  as={Link}
                  to="/products?category=womens"
                  variant="secondary"
                  size="lg"
                >
                  View Collections
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop"
                  alt="Fashion 1"
                  className="rounded-lg shadow-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
                  alt="Fashion 2"
                  className="rounded-lg shadow-2xl mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-large p-4 rounded-xl border border-neutral-200/50 animate-float">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-warning-500 fill-current" />
                  <span className="font-semibold text-text-primary">4.8/5</span>
                </div>
                <p className="text-sm text-text-muted">
                  Rated by 10k+ customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-neutral-50/50 to-background-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-soft group-hover:shadow-medium">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Free Shipping
              </h3>
              <p className="text-text-muted leading-relaxed">
                Free shipping on orders over $50. Fast and reliable delivery
                worldwide.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-accent-100 to-accent-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-soft group-hover:shadow-medium">
                <RotateCcw className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Easy Returns
              </h3>
              <p className="text-text-muted leading-relaxed">
                30-day return policy. Not satisfied? Return it for free.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-success-100 to-success-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-soft group-hover:shadow-medium">
                <Shield className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Secure Shopping
              </h3>
              <p className="text-text-muted leading-relaxed">
                Your payment information is always secure with 256-bit SSL
                encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                New Arrivals
              </h2>
              <p className="text-text-muted">
                Discover the latest additions to our collection
              </p>
            </div>
            <Link
              to="/products?sort=newest"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Popular Picks
              </h2>
              <p className="text-text-muted">
                Customer favorites and bestselling items
              </p>
            </div>
            <Link
              to="/products?sort=popular"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gradient text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Men's Category */}
            <Link to="/products?category=mens" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
                  alt="Men's Collection"
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Men's Collection
                  </h3>
                  <p className="text-white/90 mb-4">
                    Stylish and comfortable clothing for men
                  </p>
                  <span className="text-primary-400 font-semibold flex items-center space-x-1 group-hover:text-primary-300 transition-colors duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Women's Category */}
            <Link to="/products?category=womens" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop"
                  alt="Women's Collection"
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Women's Collection
                  </h3>
                  <p className="text-white/90 mb-4">
                    Elegant and trendy fashion for women
                  </p>
                  <span className="text-primary-400 font-semibold flex items-center space-x-1 group-hover:text-primary-300 transition-colors duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link to="/products?category=accessories" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"
                  alt="Accessories Collection"
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Accessories
                  </h3>
                  <p className="text-white/90 mb-4">
                    Complete your look with perfect accessories
                  </p>
                  <span className="text-primary-400 font-semibold flex items-center space-x-1 group-hover:text-primary-300 transition-colors duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden shadow-soft">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in Style</h2>
          <p className="text-white/90 text-lg mb-8">
            Subscribe to our newsletter for exclusive offers, style tips, and
            the latest fashion trends.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-xl sm:rounded-r-none rounded-r-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white text-text-primary placeholder-text-muted shadow-soft"
            />
            <Button className="rounded-l-xl sm:rounded-l-none rounded-r-xl mt-2 sm:mt-0 bg-white text-primary-600 hover:bg-neutral-50 font-bold shadow-soft">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
