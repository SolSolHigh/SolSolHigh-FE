import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { TColor } from '../../../themes/themeBase';
import { TButtonSize } from './Button.types';

const meta: Meta<typeof Button> = {
  title: 'UI/Atoms/Button',
  component: Button,
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
      description: '버튼 내부에 표시될 내용',
      control: 'text',
    },
    type: {
      description: '버튼 타입',
      control: { type: 'select', options: ['button', 'submit', 'reset'] },
    },
    color: {
      description: '버튼 색상',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'warning', 'dark', 'light'],
      },
    },
    size: {
      description: '버튼 크기',
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    disabled: {
      description: '버튼 비활성화 여부',
      control: 'boolean',
    },
    outlined: {
      description: '버튼 테두리 스타일',
      control: 'boolean',
    },
    rounded: {
      description: '버튼 둥글기',
      control: 'boolean',
    },
    fullWidth: {
      description: '버튼의 가로 길이 최대화 여부',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    color: 'primary',
    size: 'md',
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
      {colorList.map((color) => (
        <Button key={color} color={color}>
          {`${color.charAt(0).toUpperCase() + color.slice(1)} 버튼`}
        </Button>
      ))}
    </div>
  ),
};

const sizeList: TButtonSize[] = ['sm', 'md', 'lg'];

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizeList.map((size) => (
        <Button key={size} size={size}>
          {`${size.toUpperCase()} 버튼`}
        </Button>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <Button key={color} color={color} outlined>
          {`Outlined ${color.charAt(0).toUpperCase() + color.slice(1)} 버튼`}
        </Button>
      ))}
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <Button key={color} color={color} rounded>
          {`Rounded ${color.charAt(0).toUpperCase() + color.slice(1)} 버튼`}
        </Button>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => <Button fullWidth>Full Width Button</Button>,
};
