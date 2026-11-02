import { useId, type ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx.js';
import './Switch.css';

export interface SwitchProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'role'> {
  /** Name of the setting, e.g. "Notifications" (not "Turn on notifications"). */
  label: string;
  hint?: string;
}

export function Switch({
  ref,
  label,
  hint,
  id,
  disabled,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('ui-switch', disabled && 'ui-switch--disabled', className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={inputId}
        className="ui-switch__input"
        disabled={disabled}
        aria-describedby={describedBy}
        {...rest}
      />
      <label htmlFor={inputId} className="ui-switch__label">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="ui-switch__hint">
          {hint}
        </p>
      )}
    </div>
  );
}