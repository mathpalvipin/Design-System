import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@UI-lib/ui';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Notifications' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithHint: Story = { args: { hint: 'Get alerts for new messages.' } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const RightToLeft: Story = {
  args: { label: 'الإشعارات', defaultChecked: true },
  decorators: [(Story) => <div dir="rtl"><Story /></div>],
};

// a switch applies immediately: here it changes the page theme
export const InstantEffect: Story = {
  render: () => {
    const [dark, setDark] = useState(false);
    return (
      <div data-theme={dark ? 'dark' : 'light'} style={{ padding: 16, background: 'var(--color-bg-default)' }}>
        <Switch label="Dark mode" checked={dark} onChange={(e) => setDark(e.target.checked)} />
      </div>
    );
  },
};