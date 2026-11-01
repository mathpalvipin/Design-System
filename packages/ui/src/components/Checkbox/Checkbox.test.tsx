import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox.js';
import { getA11yViolations } from '../../test/axe.js';

describe('Checkbox', () => {
  it('is labelled by its label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('toggles when the label is clicked', async () => {
    render(<Checkbox label="Accept terms" />);
    await userEvent.click(screen.getByText('Accept terms'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles with the Space key', async () => {
    render(<Checkbox label="Accept terms" />);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('can be controlled', () => {
    render(<Checkbox label="Accept terms" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('shows the indeterminate (mixed) state', () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });

  it('clears indeterminate when the prop changes', () => {
    const { rerender } = render(<Checkbox label="Select all" indeterminate />);
    rerender(<Checkbox label="Select all" indeterminate={false} />);
    expect(screen.getByRole('checkbox')).not.toBePartiallyChecked();
  });

  it('forwards ref and still applies indeterminate', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Select all" indeterminate ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.indeterminate).toBe(true);
  });

  it('describes the checkbox with hint and error', () => {
    render(<Checkbox label="Accept terms" hint="Required to continue" error="Please accept" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('Required to continue Please accept');
  });

  it('does not toggle when disabled', async () => {
    render(<Checkbox label="Accept terms" disabled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accept terms" hint="Hint" />);
    expect(await getA11yViolations(container)).toEqual([]);
  });
});