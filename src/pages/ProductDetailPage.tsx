import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Star,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { ProductCard } from '../components/product';
import { products, reviews } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  formatPrice,
  calculateDiscountPercentage,
} from '../utils/productUtils';
import { Size, Color } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, addToCart, toggleWishlist } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'reviews' | 'shipping'
  >('description');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const product = products.find((p) => p.id === id);
  const productReviews = reviews.filter((r) => r.productId === id);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Product not found
          </h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = state.wishlist.includes(product.id);
  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Review submitted:', {
      rating: reviewRating,
      comment: reviewText,
    });
    setReviewText('');
    setReviewRating(5);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-text-muted hover:text-primary-600">
                Home
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link
                to="/products"
                className="text-text-muted hover:text-primary-600"
              >
                Products
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link
                to={`/products?category=${product.category}`}
                className="text-text-muted hover:text-primary-600 capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-text-primary font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 shadow-soft">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-text-primary p-2 rounded-full hover:bg-white hover:shadow-medium transition-all duration-300"
                    disabled={selectedImageIndex === 0}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        Math.min(
                          product.images.length - 1,
                          selectedImageIndex + 1
                        )
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-text-primary p-2 rounded-full hover:bg-white hover:shadow-medium transition-all duration-300"
                    disabled={selectedImageIndex === product.images.length - 1}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-soft">
                    NEW
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-gradient-to-r from-error-500 to-error-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-soft">
                    -{discountPercentage}% OFF
                  </span>
                )}
                {product.isPopular && (
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-soft">
                    POPULAR
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'border-primary-500 shadow-medium'
                        : 'border-neutral-300 hover:border-primary-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-text-muted capitalize">
                {product.category} • {product.subcategory}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-warning-500 fill-current'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-text-muted">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-gradient-to-r from-error-500 to-error-600 text-white text-sm font-semibold px-2 py-1 rounded-full shadow-soft">
                  Save {discountPercentage}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-text-primary font-semibold mb-3">
                Color:{' '}
                <span className="text-primary-600">{selectedColor?.name}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      selectedColor?.name === color.name
                        ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-medium'
                        : 'border-neutral-300 hover:border-primary-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-text-primary font-semibold mb-3">
                Size: <span className="text-primary-600">{selectedSize}</span>
              </h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-primary-600 border-primary-600 text-white shadow-soft'
                        : 'bg-white border-neutral-300 text-text-muted hover:border-primary-500 hover:text-primary-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-text-primary font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-300 rounded-lg bg-white shadow-soft">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-l-lg transition-all duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-text-primary font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-r-lg transition-all duration-200"
                  >
                    +
                  </button>
                </div>
                <span className="text-text-muted">
                  {product.inStock ? (
                    <span className="text-success-600 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-error-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize || !selectedColor}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isInWishlist
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 border-accent-600 text-white shadow-soft'
                    : 'bg-white border-neutral-300 text-text-muted hover:border-accent-500 hover:text-accent-600'
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isInWishlist ? 'currentColor' : 'none'}
                />
              </button>
              <button className="p-3 bg-white border border-neutral-300 rounded-lg text-text-muted hover:text-primary-600 hover:border-primary-400 transition-all duration-300">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                <div className="text-sm text-text-muted">Free Shipping</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-accent-600 mx-auto mb-2" />
                <div className="text-sm text-text-muted">30-Day Returns</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-success-600 mx-auto mb-2" />
                <div className="text-sm text-text-muted">2-Year Warranty</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8">
              {(['description', 'reviews', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-semibold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-text-muted hover:text-text-primary hover:border-neutral-300'
                  }`}
                >
                  {tab}
                  {tab === 'reviews' && ` (${productReviews.length})`}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Product Details
                </h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  {product.description}
                </p>

                <h4 className="text-lg font-semibold text-text-primary mb-3">
                  Features
                </h4>
                <ul className="space-y-2 text-text-muted">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-success-600" />
                    <span>Premium quality materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-success-600" />
                    <span>Comfortable fit</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-success-600" />
                    <span>Durable construction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-success-600" />
                    <span>Easy care instructions</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  Customer Reviews
                </h3>

                {/* Review Form */}
                <div className="card p-6 mb-8">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Write a Review
                  </h4>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Rating
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className={`text-2xl transition-colors duration-200 ${
                              star <= reviewRating
                                ? 'text-warning-500'
                                : 'text-neutral-300 hover:text-warning-400'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Review
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        className="input-field w-full"
                        placeholder="Share your thoughts about this product..."
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary">
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-text-primary font-semibold">
                                {review.userName}
                              </div>
                              <div className="text-text-muted text-sm">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-warning-500 fill-current'
                                      : 'text-neutral-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-text-muted leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  Shipping & Returns
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-3">
                      Shipping Information
                    </h4>
                    <ul className="space-y-2 text-text-muted">
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>Free shipping on orders over $50</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>Standard shipping: 3-7 business days</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>Express shipping: 1-2 business days</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-3">
                      Return Policy
                    </h4>
                    <ul className="space-y-2 text-text-muted">
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>30-day return window</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>Free returns on all orders</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success-600" />
                        <span>Items must be in original condition</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              You might also like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
