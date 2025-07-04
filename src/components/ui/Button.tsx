import React from 'react';
import { cn } from '../../utils/ui/className';

interface BaseButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: 'button';
  children: React.ReactNode;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: 'a';
  children: React.ReactNode;
}

interface ButtonAsComponent extends BaseButtonProps {
  as: React.ComponentType<any>;
  children: React.ReactNode;
  [key: string]: any;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsComponent;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  as: Component = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-soft hover:shadow-medium focus:ring-primary-500/20',
    secondary:
      'bg-white hover:bg-neutral-50 text-text-primary border border-neutral-200 hover:border-neutral-300 focus:ring-primary-500/20 shadow-soft hover:shadow-medium',
    accent:
      'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-soft hover:shadow-medium focus:ring-accent-500/20',
    outline:
      'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 focus:ring-primary-500/20',
    ghost:
      'text-text-muted hover:text-text-primary hover:bg-neutral-50 focus:ring-primary-500/20',
    danger:
      'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-soft hover:shadow-medium focus:ring-error-500/20',
    success:
      'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-soft hover:shadow-medium focus:ring-success-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  };

  const combinedClassName = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (Component === 'button') {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        className={combinedClassName}
        disabled={isLoading || buttonProps.disabled}
        {...buttonProps}
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {children}
      </button>
    );
  }

  if (Component === 'a') {
    const linkProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={combinedClassName} {...linkProps}>
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {children}
      </a>
    );
  }

  return (
    <Component className={combinedClassName} {...props}>
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      )}
      {children}
    </Component>
  );
};

export default Button;
