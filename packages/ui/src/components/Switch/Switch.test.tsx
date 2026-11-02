import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch.js';
import { getA11yViolations } from '../../test/axe.js';

describe('Switch', () => {
  it('has the switch role and an accessible name', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('turns on when clicked', async () => {
    render(<Switch label="Notifications" />);
    const toggle = screen.getByRole('switch');
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('toggles with the Space key', async () => {
    render(<Switch label="Notifications" />);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('turns on when the label is clicked', async () => {
    render(<Switch label="Notifications" />);
    await userEvent.click(screen.getByText('Notifications'));
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls onChange with the new state', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it('can be controlled', () => {
    render(<Switch label="Notifications" checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is described by its hint', () => {
    render(<Switch label="Notifications" hint="Get alerts for new messages" />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription(
      'Get alerts for new messages',
    );
  });

  it('does not toggle when disabled', async () => {
    render(<Switch label="Notifications" disabled />);
    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('forwards ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch label="Notifications" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch label="Notifications" hint="Hint" />);
    expect(await getA11yViolations(container)).toEqual([]);
  });
});