import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Mascot } from '.';

const meta = {
  title: 'UI/Molecules/Mascot',
  component: Mascot,
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
    nickname: {
      description: '닉네임',
    },
    ment: {
      description: '멘트',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof Mascot>;

export default meta;

type Story = StoryObj<typeof Mascot>;

export const Default: Story = {
  args: {
    nickname: '닉네임',
    ment: '반가워요! 몇 가지만 더 물어볼게요',
  },
  render: (args) => {
    return <Mascot {...args} />;
  },
};
