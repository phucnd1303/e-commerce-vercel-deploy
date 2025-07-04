import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/productUtils';

const CartPage: React.FC = () => {
  const { state, updateCartQuantity, removeFromCart, clearCart } = useApp();

  const cartTotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const shippingCost = cartTotal >= 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-text-muted mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Your cart is empty
            </h2>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Shopping Cart
            </h1>
            <p className="text-text-muted">
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your
              cart
            </p>
          </div>
          <Link
            to="/products"
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Cart Items
                </h2>
                <button
                  onClick={clearCart}
                  className="text-error-600 hover:text-error-700 text-sm font-medium hover:bg-error-50 px-3 py-1 rounded-lg transition-all duration-300"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {state.cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color.name}`}
                    className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-soft hover:shadow-medium transition-all duration-300"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="text-text-primary font-medium hover:text-primary-600 transition-colors duration-200"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-text-muted text-sm capitalize mt-1">
                        {item.product.category} • {item.product.subcategory}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-text-muted text-sm">Size:</span>
                          <span className="text-text-primary text-sm font-medium">
                            {item.size}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-text-muted text-sm">
                            Color:
                          </span>
                          <div className="flex items-center space-x-1">
                            <div
                              className="w-4 h-4 rounded-full border border-neutral-300 shadow-soft"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            <span className="text-text-primary text-sm font-medium">
                              {item.color.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-text-primary font-semibold">
                        {formatPrice(item.product.price)}
                      </div>
                      {item.product.originalPrice && (
                        <div className="text-text-muted text-sm line-through">
                          {formatPrice(item.product.originalPrice)}
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-soft">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="p-1 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded transition-all duration-200"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-text-primary font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-1 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded transition-all duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.size, item.color)
                      }
                      className="p-2 text-error-500 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-success-600 font-medium">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-text-primary font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {shippingCost > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <p className="text-primary-700 text-sm">
                    Add {formatPrice(50 - cartTotal)} more to get free shipping!
                  </p>
                </div>
              )}

              <button className="w-full btn-primary mb-4">
                Proceed to Checkout
              </button>

              <button className="w-full btn-secondary">Save for Later</button>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center space-x-4 text-text-muted text-sm">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Trusted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            You might also like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for recommended products */}
            <div className="card p-4 text-center">
              <div className="w-full h-32 bg-neutral-100 rounded-lg mb-4"></div>
              <p className="text-text-muted text-sm">
                Recommended products based on your cart
              </p>
            </div>
            <div className="card p-4 text-center">
              <div className="w-full h-32 bg-neutral-100 rounded-lg mb-4"></div>
              <p className="text-text-muted text-sm">
                Recommended products based on your cart
              </p>
            </div>
            <div className="card p-4 text-center">
              <div className="w-full h-32 bg-neutral-100 rounded-lg mb-4"></div>
              <p className="text-text-muted text-sm">
                Recommended products based on your cart
              </p>
            </div>
            <div className="card p-4 text-center">
              <div className="w-full h-32 bg-neutral-100 rounded-lg mb-4"></div>
              <p className="text-text-muted text-sm">
                Recommended products based on your cart
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
