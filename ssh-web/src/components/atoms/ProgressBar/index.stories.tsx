import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '.';

const meta = {
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percent: 40,
    color: 'primary',
    size: 'md',
    fullWidth: false,
  },
};
