import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@UI-lib/ui';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Accept terms and conditions' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };
export const WithHint: Story = { args: { hint: 'You must accept to continue.' } };
export const WithError: Story = { args: { error: 'Please accept the terms.' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

// a real "select all" example showing why indeterminate exists
const fruits = ['Apple', 'Banana', 'Cherry'];

export const SelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Apple']);
    const all = selected.length === fruits.length;
    const some = selected.length > 0 && !all;

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <Checkbox
          label="Select all fruits"
          checked={all}
          indeterminate={some}
          onChange={() => setSelected(all ? [] : fruits)}
        />
        <div style={{ display: 'grid', gap: 8, paddingLeft: 28 }}>
          {fruits.map((fruit) => (
            <Checkbox
              key={fruit}
              label={fruit}
              checked={selected.includes(fruit)}
              onChange={() =>
                setSelected((prev) =>
                  prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit],
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};