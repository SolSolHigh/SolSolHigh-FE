import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './index';
import { TColor } from '../../../themes/themeBase';
import { HiOutlineCheckCircle } from 'react-icons/hi';

const meta: Meta<typeof Badge> = {
  title: 'UI/Atoms/Badge',
  component: Badge,
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
    text: {
      description: '뱃지 내부에 표시될 텍스트',
      control: 'text',
    },
    color: {
      description: '뱃지의 배경 색상',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'warning', 'dark', 'light'],
      },
    },
    textColor: {
      description: '텍스트의 색상',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'warning', 'dark', 'light'],
      },
    },
    size: {
      description: '뱃지와 텍스트의 크기',
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
    },
    weight: {
      description: '텍스트의 font-weight',
      control: {
        type: 'select',
        options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      },
    },
    startIcon: {
      description: '텍스트 앞에 추가할 아이콘 또는 콘텐츠',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    text: '기본 뱃지',
    color: 'primary',
    textColor: 'light',
    size: 'md',
    weight: 'light',
    startIcon: <HiOutlineCheckCircle />,
  },
};

export const WithCustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Badge
        text="Primary Badge"
        color="primary"
        textColor="light"
        size="md"
        weight="regular"
      />
      <Badge
        text="Secondary Badge"
        color="secondary"
        textColor="dark"
        size="md"
        weight="regular"
      />
      <Badge
        text="Warning Badge"
        color="warning"
        textColor="dark"
        size="md"
        weight="regular"
      />
    </div>
  ),
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
        <Badge
          key={color}
          color={color}
          text="Badge"
          textColor="light"
          size="md"
          weight="light"
        />
      ))}
    </div>
  ),
};

const sizeList: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizeList.map((size) => (
        <Badge
          key={size}
          size={size}
          text="Badge"
          color="primary"
          textColor="light"
          weight="light"
        />
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {['light', 'regular', 'medium', 'semibold', 'bold'].map((weight) => (
        <Badge
          key={weight}
          size="md"
          text={weight.charAt(0).toUpperCase() + weight.slice(1)}
          color="primary"
          textColor="light"
          weight={
            weight as 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
          }
        />
      ))}
    </div>
  ),
};

export const WithStartIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Badge
        text="With Icon"
        color="primary"
        textColor="light"
        size="md"
        weight="regular"
        startIcon={<HiOutlineCheckCircle />}
      />
      <Badge
        text="With Image"
        color="secondary"
        textColor="dark"
        size="md"
        weight="regular"
        startIcon={
          <img
            src="https://via.placeholder.com/18"
            alt="예시 이미지"
            className="rounded-full"
          />
        }
      />
    </div>
  ),
};
