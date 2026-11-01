import { useEffect, useId, useMemo, useRef, type ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx.js';
import { mergeRefs } from '../../utils/mergeRefs.js';
import './Checkbox.css';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  hint?: string;
  error?: string;
  /** Shows a "mixed" state, e.g. a "select all" with some items selected. */
  indeterminate?: boolean;
}

export function Checkbox({
  ref,
  label,
  hint,
  error,
  indeterminate = false,
  id,
  disabled,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

  // indeterminate is a DOM property only, so set it through a ref
  const innerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const combinedRef = useMemo(() => mergeRefs(innerRef, ref), [ref]);

  return (
    <div
      className={cx(
        'ui-checkbox',
        error && 'ui-checkbox--invalid',
        disabled && 'ui-checkbox--disabled',
        className,
      )}
    >
      <input
        ref={combinedRef}
        type="checkbox"
        id={inputId}
        className="ui-checkbox__input"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      <label htmlFor={inputId} className="ui-checkbox__label">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="ui-checkbox__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="ui-checkbox__error">
          {error}
        </p>
      )}
    </div>
  );
}