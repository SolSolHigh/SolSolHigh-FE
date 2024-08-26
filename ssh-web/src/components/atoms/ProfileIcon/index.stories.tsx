import type { Meta, StoryObj } from '@storybook/react';

import { ProfileIcon } from './index';

const meta = {
  component: ProfileIcon,
} satisfies Meta<typeof ProfileIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '글자',
    size: 'md',
    color: 'primary',
    weight: 'regular',
  },
};
