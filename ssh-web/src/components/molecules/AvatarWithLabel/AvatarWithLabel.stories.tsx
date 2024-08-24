import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarWithLabel } from './index';

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

const meta: Meta<typeof AvatarWithLabel> = {
  title: 'UI/Molecules/AvatarWithLabel',
  component: AvatarWithLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'The URL of the avatar image',
    },
    altText: {
      control: 'text',
      description: 'The alt text for the avatar image',
    },
    size: {
      control: {
        type: 'select',
        options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      },
      description: 'The size of the avatar',
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
      description: 'The background color of the avatar',
    },
    label: {
      control: 'text',
      description: 'The label text displayed below the avatar',
    },
    labelSize: {
      control: {
        type: 'select',
        options: [
          '6xs',
          '5xs',
          '4xs',
          '3xs',
          '2xs',
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
          '2xl',
          '3xl',
        ],
      },
      description: 'The size of the label text',
    },
    labelWeight: {
      control: {
        type: 'select',
        options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      },
      description: 'The font weight of the label text',
    },
    labelColor: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'warning', 'dark', 'light'],
      },
      description: 'The color of the label text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarWithLabel>;

export const Default: Story = {
  args: {
    imageUrl: boyImages[0],
    altText: 'Boy 1',
    size: 'md',
    bgColor: 'blue',
    label: '차은우',
    labelSize: 'md',
    labelWeight: 'regular',
    labelColor: 'dark',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size, index) => (
        <AvatarWithLabel
          key={size}
          imageUrl={boyImages[index % boyImages.length]}
          altText={`${size} Image`}
          size={size as '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'}
          bgColor="green"
          label="차은우"
          labelSize="md"
          labelWeight="regular"
          labelColor="dark"
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
        <AvatarWithLabel
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
          label="차은우"
          labelSize="md"
          labelWeight="regular"
          labelColor="dark"
        />
      ))}
    </div>
  ),
};

export const LabelVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AvatarWithLabel
        imageUrl={boyImages[1]}
        altText="Boy 2"
        size="lg"
        bgColor="blue"
        label="Bold & Large"
        labelSize="lg"
        labelWeight="bold"
        labelColor="primary"
      />
      <AvatarWithLabel
        imageUrl={girlImages[0]}
        altText="Girl 1"
        size="md"
        bgColor="pink"
        label="Medium & Secondary"
        labelSize="md"
        labelWeight="medium"
        labelColor="secondary"
      />
      <AvatarWithLabel
        imageUrl={boyImages[2]}
        altText="Boy 3"
        size="sm"
        bgColor="yellow"
        label="Small & Light"
        labelSize="sm"
        labelWeight="light"
        labelColor="dark"
      />
    </div>
  ),
};
