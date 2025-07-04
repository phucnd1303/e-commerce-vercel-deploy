import React from 'react';
import { cn } from '../../utils/ui/className';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'search';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses =
    'w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all duration-300 shadow-soft hover:shadow-medium';

  const variants = {
    default: '',
    search: 'pl-10',
  };

  const errorClasses = error
    ? 'border-error-500 focus:ring-error-500/20 focus:border-error-400'
    : '';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-text-primary mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          className={cn(
            baseClasses,
            variants[variant],
            errorClasses,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-error-600 font-medium">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-text-muted">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
