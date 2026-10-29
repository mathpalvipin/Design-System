import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import "./Button.css";

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cx(
          'ui-button',
          `ui-button--${variant}`,
          `ui-button--${size}`,
          loading && 'ui-button--loading',
          className,
        )}
        {...rest}
      >
        {loading && <span className="ui-button__spinner" aria-hidden="true" />}
        {!loading && leftIcon && <span className="ui-button__icon">{leftIcon}</span>}
        <span className="ui-button__label">{children}</span>
        {!loading && rightIcon && <span className="ui-button__icon">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';