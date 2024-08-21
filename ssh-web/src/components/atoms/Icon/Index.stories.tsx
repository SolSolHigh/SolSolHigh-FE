import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiFire } from 'react-icons/hi2';
import { TColor } from '../../../themes/themeBase';
import { Icon } from './index';
import { TIconSize } from './Icon.types';

const meta = {
  title: 'UI/Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
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

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    children: <HiFire />,
    size: 'md',
    color: 'primary',
  },
};

const colorList: TColor[] = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'dark',
  'light',
];

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => {
        return (
          <Icon key={color} color={color}>
            <HiFire />
          </Icon>
        );
      })}
    </div>
  ),
};

const sizeList: TIconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizeList.map((size) => {
        return (
          <Icon key={size} size={size}>
            <HiFire />
          </Icon>
        );
      })}
    </div>
  ),
};
