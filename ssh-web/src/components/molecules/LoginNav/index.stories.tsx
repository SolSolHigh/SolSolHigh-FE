import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginNav } from '.';

const meta = {
  title: 'UI/Molecules/LoginNav',
  component: LoginNav,
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
      description: '표시할 텍스트',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof LoginNav>;

export default meta;

type Story = StoryObj<typeof LoginNav>;

export const Primary: Story = {
  args: {},
};
