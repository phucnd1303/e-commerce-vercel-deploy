import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Button, Input } from '../ui';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">StyleHub</span>
            </Link>
            <p className="text-text-muted mb-4 max-w-md leading-relaxed">
              Your destination for premium apparel and accessories. We bring you
              the latest trends with uncompromising quality and style.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-text-muted hover:text-primary-600 transition-all duration-300 p-2 rounded-lg hover:bg-primary-50"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-primary-600 transition-all duration-300 p-2 rounded-lg hover:bg-primary-50"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-accent-600 transition-all duration-300 p-2 rounded-lg hover:bg-accent-50"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-success-600 transition-all duration-300 p-2 rounded-lg hover:bg-success-50"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=mens"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=womens"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=accessories"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-text-primary font-bold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded-lg inline-block"
                >
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <div className="max-w-md">
            <h3 className="text-text-primary font-bold mb-4">Stay Updated</h3>
            <p className="text-text-muted mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none flex-1"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © 2024 StyleHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-text-muted hover:text-primary-600 text-sm transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-primary-600 text-sm transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-primary-600 text-sm transition-all duration-300 hover:bg-primary-50 px-2 py-1 rounded"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
