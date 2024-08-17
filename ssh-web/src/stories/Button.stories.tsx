// src/components/Button.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'danger'] },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args:ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'medium',
  children: 'Secondary Button',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  size: 'medium',
  children: 'Danger Button',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'primary',
  size: 'large',
  children: 'Large Button',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'primary',
  size: 'small',
  children: 'Small Button',
};
