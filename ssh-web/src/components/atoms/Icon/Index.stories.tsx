import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from '.';
import { HiFire } from 'react-icons/hi2';

const meta = {
  component: Icon,
  argTypes: {
    children: {
      description: '표시할 아이콘',
    },
    size: {
      description: '아이콘 크기',
    },
    color: {
      description: '아이콘 색상',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <HiFire />,
    size: 'md',
    color: 'primary',
  },
};
