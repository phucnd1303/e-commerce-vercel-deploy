import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/product';
import { products } from '../data/mockData';
import { formatPrice } from '../utils/productUtils';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

interface OrderHistory {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: OrderItem[];
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>(
    'profile'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Mock order history
  const orderHistory: OrderHistory[] = [
    {
      id: 'ORDER-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 129.99,
      items: [
        {
          id: '1',
          name: 'Premium Cotton T-Shirt',
          price: 29.99,
          quantity: 2,
          image: '/api/placeholder/300/400',
          size: 'M',
          color: 'Navy Blue',
        },
        {
          id: '2',
          name: 'Casual Denim Jeans',
          price: 79.99,
          quantity: 1,
          image: '/api/placeholder/300/400',
          size: 'L',
          color: 'Dark Blue',
        },
      ],
    },
    {
      id: 'ORDER-002',
      date: '2024-01-10',
      status: 'processing',
      total: 89.99,
      items: [
        {
          id: '3',
          name: 'Wool Blend Sweater',
          price: 89.99,
          quantity: 1,
          image: '/api/placeholder/300/400',
          size: 'S',
          color: 'Charcoal Gray',
        },
      ],
    },
  ];

  const wishlistProducts = products.filter((product) =>
    state.wishlist.includes(product.id)
  );

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would save to an API
    console.log('Profile saved:', editedUser);
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-success-600 bg-success-50';
      case 'processing':
        return 'text-warning-600 bg-warning-50';
      case 'shipped':
        return 'text-primary-600 bg-primary-50';
      case 'cancelled':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-text-muted bg-neutral-100';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Please log in to view your profile
          </h2>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-soft">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-bold text-text-primary text-center">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-text-muted text-center">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'text-text-muted hover:bg-neutral-50 hover:text-text-primary'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'orders'
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'text-text-muted hover:bg-neutral-50 hover:text-text-primary'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'wishlist'
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'text-text-muted hover:bg-neutral-50 hover:text-text-primary'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">
                    Wishlist ({state.wishlist.length})
                  </span>
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-error-600 hover:bg-error-50 rounded-lg transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-text-primary">
                    Profile Information
                  </h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span className="font-medium">Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 text-text-muted hover:text-text-primary px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.firstName || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            firstName: e.target.value,
                          })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-text-muted py-2">{user?.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.lastName || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            lastName: e.target.value,
                          })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-text-muted py-2">{user?.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser?.email || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            email: e.target.value,
                          })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-text-muted py-2">{user?.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedUser?.phone || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                        className="input-field w-full"
                        placeholder="Add phone number"
                      />
                    ) : (
                      <p className="text-text-muted py-2">
                        {user?.phone || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedUser?.address || ''}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            address: e.target.value,
                          })
                        }
                        className="input-field w-full"
                        rows={3}
                        placeholder="Add your address"
                      />
                    ) : (
                      <p className="text-text-muted py-2">
                        {user?.address || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-6">
                  Order History
                </h1>
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {order.id}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-text-muted text-sm">
                            {order.date}
                          </p>
                          <p className="text-text-primary font-semibold">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-text-primary">
                                {item.name}
                              </h4>
                              <p className="text-text-muted text-sm">
                                Size: {item.size} • Color: {item.color} • Qty:{' '}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-text-primary">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-6">
                  My Wishlist ({wishlistProducts.length} items)
                </h1>
                {wishlistProducts.length === 0 ? (
                  <div className="card p-12 text-center">
                    <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-text-muted mb-6">
                      Start adding items you love to your wishlist
                    </p>
                    <button
                      onClick={() => window.location.assign('/products')}
                      className="btn-primary"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
