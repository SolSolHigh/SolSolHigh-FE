import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Divider } from '.';

const meta: Meta<typeof Divider> = {
  title: 'UI/Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    color: {
      description: 'Divider의 색상',
      control: {
        type: 'select',
        options: ['light', 'dark', 'primary'],
      },
    },
    thickness: {
      description: 'Divider의 두께',
      control: {
        type: 'select',
        options: ['thin', 'medium', 'thick'],
      },
    },
    classNameStyles: {
      description: '추가적인 CSS 클래스를 적용할 수 있습니다.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Divider color="light" />
      <Divider color="dark" />
      <Divider color="primary" />
    </div>
  ),
};

export const Thicknesses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Divider thickness="thin" />
      <Divider thickness="medium" />
      <Divider thickness="thick" />
    </div>
  ),
};

export const CustomColorAndThickness: Story = {
  args: {
    color: 'primary',
    thickness: 'medium',
  },
};

export const ThickDarkDivider: Story = {
  args: {
    color: 'dark',
    thickness: 'thick',
  },
};
