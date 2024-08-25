import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberDial } from '.';

const meta = {
  title: 'UI/Molecules/NumberDial',
  component: NumberDial,
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
    min: {
      description: '다이얼의 최솟값',
    },
    max: {
      description: '다이얼의 최댓값',
    },
    defaultNumber: {
      description: '다이얼의 초기값',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof NumberDial>;

export default meta;

type Story = StoryObj<typeof NumberDial>;

export const Default: Story = {
  args: {
    min: 1970,
    max: 2070,
    defaultNumber: 2024,
  },
  render: (args) => {
    return (
      <div className="flex items-center justify-center p-28">
        <NumberDial
          {...args}
          specialNumber={2024}
          specialMent={'신한은행 입사'}
        />
      </div>
    );
  },
};
