import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Required for accessibility. */
  label: string;
  /** Helper text shown below the input. */
  hint?: string;
  /** Error message. Also marks the input as invalid. */
  error?: string;
  size?: InputSize;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      hideLabel = false,
      id,
      required,
      disabled,
      className,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // keep any aria-describedby the user passed, then add hint and error
    const describedBy =
      [ariaDescribedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div
        className={cx(
          'ui-field',
          `ui-field--${size}`,
          error && 'ui-field--invalid',
          disabled && 'ui-field--disabled',
          className,
        )}
      >
        <label
          htmlFor={inputId}
          className={cx('ui-field__label', hideLabel && 'ui-visually-hidden')}
        >
          {label}
          {required && (
            <span className="ui-field__required" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className="ui-field__input"
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />

        {hint && (
          <p id={hintId} className="ui-field__hint">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="ui-field__error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';