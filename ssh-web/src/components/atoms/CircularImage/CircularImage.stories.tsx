import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircularImage } from './index';

// 이미지 경로 설정
const boyImages = [
  '/assets/images/samples/children/boy1.png',
  '/assets/images/samples/children/boy2.png',
  '/assets/images/samples/children/boy3.png',
];
const girlImages = [
  '/assets/images/samples/children/girl1.png',
  '/assets/images/samples/children/girl2.png',
  '/assets/images/samples/children/girl3.png',
];

const meta: Meta<typeof CircularImage> = {
  title: 'UI/Atoms/CircularImage',
  component: CircularImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imageUrl: {
      control: 'text',
    },
    altText: {
      control: 'text',
    },
    size: {
      control: {
        type: 'select',
        options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      },
    },
    bgColor: {
      control: {
        type: 'select',
        options: [
          'pink',
          'blue',
          'green',
          'yellow',
          'purple',
          'orange',
          'gray',
          'red',
          'teal',
          'indigo',
        ],
      },
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CircularImage>;

export const Default: Story = {
  args: {
    imageUrl: boyImages[0],
    altText: 'Boy 1',
    size: 'md',
    bgColor: 'blue',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size, index) => (
        <CircularImage
          key={size}
          imageUrl={boyImages[index % boyImages.length]}
          altText={`${size} Image`}
          size={size as '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'}
          bgColor="green"
        />
      ))}
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {[
        'pink',
        'blue',
        'green',
        'yellow',
        'purple',
        'orange',
        'gray',
        'red',
        'teal',
        'indigo',
      ].map((color, index) => (
        <CircularImage
          key={color}
          imageUrl={girlImages[index % girlImages.length]}
          altText={`${color} Image`}
          size="md"
          bgColor={
            color as
              | 'pink'
              | 'blue'
              | 'green'
              | 'yellow'
              | 'purple'
              | 'orange'
              | 'gray'
              | 'red'
              | 'teal'
              | 'indigo'
          }
        />
      ))}
    </div>
  ),
};
