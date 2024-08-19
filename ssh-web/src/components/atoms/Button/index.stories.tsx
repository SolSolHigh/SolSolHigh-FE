import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta = {
  component: Button,
  argTypes: {
    children: {
      description: '버튼 안에 표시할 텍스트',
    },
    fullWidth: {
      description: '버튼의 스타일',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    fullWidth: true,
  },
};
