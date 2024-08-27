import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberDial } from '.';

const meta: Meta<typeof NumberDial> = {
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
    min: {
      description: '다이얼의 최솟값',
      control: 'number',
    },
    max: {
      description: '다이얼의 최댓값',
      control: 'number',
    },
    defaultNumber: {
      description: '다이얼의 초기값',
      control: 'number',
    },
    labels: {
      description: '각 다이얼 값에 대응하는 텍스트 라벨',
      control: 'object',
    },
    classNameStyles: {
      description: '부가적인 스타일',
      control: 'text',
    },
  },
} satisfies Meta<typeof NumberDial>;

export default meta;

type Story = StoryObj<typeof NumberDial>;

export const DefaultNumberDial: Story = {
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

export const DifficultyLevelDial: Story = {
  args: {
    min: 1,
    max: 3,
    defaultNumber: 2,
    labels: ['하', '중', '상'],
  },
  render: (args) => {
    return (
      <div className="flex items-center justify-center p-28">
        <NumberDial {...args} />
      </div>
    );
  },
};
