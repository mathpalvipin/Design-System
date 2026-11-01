import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@UI-lib/ui';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'you@example.com' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll never share your email." } };
export const WithError: Story = { args: { error: 'Enter a valid email address.' } };
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true, value: 'locked@example.com' } };
export const HiddenLabel: Story = {
  args: { label: 'Search', hideLabel: true, placeholder: 'Search…', type: 'search' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};
 