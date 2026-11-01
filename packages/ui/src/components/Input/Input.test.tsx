import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input.js';
import { getA11yViolations } from '../../test/axe.js';

describe('Input', () => {
  it('is labelled by its label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('keeps an accessible name when the label is hidden', () => {
    render(<Input label="Search" hideLabel />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('describes the input with the hint', () => {
    render(<Input label="Email" hint="We'll never share it" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      "We'll never share it",
    );
  });

  it('marks the input invalid and describes the error', () => {
    render(<Input label="Email" hint="Work email" error="Enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Work email Enter a valid email');
  });

  it('is not invalid without an error', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('keeps an aria-describedby passed by the user', () => {
    render(
      <>
        <p id="extra">Extra info</p>
        <Input label="Email" aria-describedby="extra" hint="Hint" />
      </>,
    );
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Extra info Hint',
    );
  });

  it('uses a custom id when given', () => {
    render(<Input label="Email" id="my-email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'my-email');
  });

  it('sets required on the input', () => {
    render(<Input label="Name" required />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
  });

  it('accepts typing and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    const input = screen.getByLabelText('Name');
    await userEvent.type(input, 'Ana');
    expect(input).toHaveValue('Ana');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('does not accept typing when disabled', async () => {
    render(<Input label="Name" disabled />);
    const input = screen.getByLabelText('Name');
    await userEvent.type(input, 'Ana');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Email" hint="Hint" />);
    expect(await getA11yViolations(container)).toEqual([]);
  });

  it('has no accessibility violations with an error', async () => {
    const { container } = render(<Input label="Email" error="Required" />);
    expect(await getA11yViolations(container)).toEqual([]);
  });
});