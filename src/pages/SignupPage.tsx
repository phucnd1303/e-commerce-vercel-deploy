import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      const success = await signup(email, password, name);
      if (success) {
        navigate('/');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background-50 via-background-100 to-neutral-100">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-100/40 to-accent-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-100/40 to-primary-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-accent-400/60 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-1 h-1 bg-primary-300/60 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm shadow-large border border-white/50 rounded-3xl p-8 space-y-8 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center space-y-6">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center space-x-3 group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary-500/20 via-primary-600/20 to-accent-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent">
                    StyleHub
                  </span>
                </Link>

                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-text-primary tracking-tight">
                    Join StyleHub
                  </h2>
                  <p className="text-lg text-text-muted font-medium">
                    Create your account and start your fashion journey
                  </p>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-error-50 border border-error-200 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-error-700 text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-text-primary"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-4 h-5 w-5 text-text-muted group-focus-within:text-primary-500 transition-colors duration-200" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/70 border border-neutral-200 rounded-2xl text-text-primary placeholder-text-muted backdrop-blur-sm focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none shadow-soft focus:shadow-medium"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-text-primary"
                    >
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-primary-400 group-focus-within:text-primary-600 transition-colors duration-200" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/70 border border-neutral-200 rounded-2xl text-text-primary placeholder-text-muted backdrop-blur-sm focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none shadow-soft focus:shadow-medium"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-text-primary"
                    >
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-text-muted group-focus-within:text-primary-500 transition-colors duration-200" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-white/70 border border-neutral-200 rounded-2xl text-text-primary placeholder-text-muted backdrop-blur-sm focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none shadow-soft focus:shadow-medium"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-text-muted hover:text-primary-500 transition-colors duration-200 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-text-primary"
                    >
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-text-muted group-focus-within:text-primary-500 transition-colors duration-200" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-white/70 border border-neutral-200 rounded-2xl text-text-primary placeholder-text-muted backdrop-blur-sm focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none shadow-soft focus:shadow-medium"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-4 text-text-muted hover:text-primary-500 transition-colors duration-200 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="terms"
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                        agreeToTerms
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-soft'
                          : 'border-neutral-300 bg-white hover:border-primary-300'
                      }`}
                    >
                      {agreeToTerms && <Check className="w-3 h-3 text-white" />}
                    </label>
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-sm text-text-muted cursor-pointer leading-relaxed"
                  >
                    I agree to the{' '}
                    <a
                      href="#"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-2xl shadow-medium hover:shadow-large focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </button>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-text-muted">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-semibold text-accent-600 hover:text-accent-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/20 rounded-lg px-2 py-1"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-text-muted font-medium backdrop-blur-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="group relative bg-white/70 border border-neutral-200 text-text-secondary font-medium py-4 px-4 rounded-2xl backdrop-blur-sm hover:bg-white hover:border-neutral-300 hover:shadow-soft transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-neutral-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/50 to-red-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                    </svg>
                    <span>Google</span>
                  </div>
                </button>

                <button className="group relative bg-white/70 border border-neutral-200 text-text-secondary font-medium py-4 px-4 rounded-2xl backdrop-blur-sm hover:bg-white hover:border-neutral-300 hover:shadow-soft transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-neutral-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
