import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  formatPrice,
  calculateDiscountPercentage,
} from '../../utils/product/pricing';
import { Button, Badge, Card } from '../ui';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, addToCart, toggleWishlist } = useApp();
  const isInWishlist = state.wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Use first available size and color
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];

    if (defaultSize && defaultColor) {
      addToCart(product, defaultSize, defaultColor, 1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0;

  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card
        padding="none"
        className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.isNew && (
              <Badge variant="new" size="sm">
                NEW
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="sale" size="sm">
                -{discountPercentage}%
              </Badge>
            )}
            {product.isPopular && (
              <Badge variant="popular" size="sm">
                POPULAR
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isInWishlist
                ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-soft'
                : 'bg-white text-text-muted hover:bg-gradient-to-r hover:from-accent-500 hover:to-accent-600 hover:text-white shadow-soft hover:shadow-medium'
            }`}
          >
            <Heart
              className="h-4 w-4"
              fill={isInWishlist ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-white/95 hover:bg-primary-500 hover:text-white text-primary-600 border border-primary-500/50 hover:border-primary-400 shadow-soft hover:shadow-medium backdrop-blur-sm"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-neutral-900/80 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="error">Out of Stock</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-text-primary font-medium text-lg mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-text-muted text-sm capitalize">
              {product.category} • {product.subcategory}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-warning-500 fill-current'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-text-muted text-sm">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-text-primary font-semibold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-text-muted text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Options Preview */}
          <div className="flex items-center space-x-1 mt-3">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-neutral-300 hover:scale-110 transition-transform duration-200 shadow-soft"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-text-muted text-xs ml-1">
                +{product.colors.length - 4} more
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
