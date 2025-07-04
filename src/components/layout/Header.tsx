import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../ui';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state, setSearchQuery: setGlobalSearchQuery } = useApp();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery);
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-neutral-200/50 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gradient">StyleHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              All Products
            </Link>
            <Link
              to="/products?category=mens"
              className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Men's
            </Link>
            <Link
              to="/products?category=womens"
              className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Women's
            </Link>
            <Link
              to="/products?category=accessories"
              className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Accessories
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <Input
                variant="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                leftIcon={<Search className="h-4 w-4" />}
              />
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <button className="relative p-2.5 text-text-muted hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all duration-300 group">
              <Heart className="h-5 w-5" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-soft animate-pulse">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-soft animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2.5 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full ring-2 ring-primary-500/30"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="hidden md:block font-medium text-text-primary">
                    {user?.name}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-xl shadow-large opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 first:rounded-t-xl transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-text-secondary hover:text-error-600 hover:bg-error-50 last:rounded-b-xl transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-text-secondary hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  Login
                </Link>
                <Button as={Link} to="/signup" size="sm">
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-neutral-200/50">
          <form onSubmit={handleSearch}>
            <Input
              variant="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              leftIcon={<Search className="h-4 w-4" />}
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-neutral-200/50 shadow-soft">
          <nav className="px-4 py-4 space-y-1">
            <Link
              to="/"
              className="block py-3 px-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-3 px-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/products?category=mens"
              className="block py-3 px-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Men's
            </Link>
            <Link
              to="/products?category=womens"
              className="block py-3 px-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Women's
            </Link>
            <Link
              to="/products?category=accessories"
              className="block py-3 px-3 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
