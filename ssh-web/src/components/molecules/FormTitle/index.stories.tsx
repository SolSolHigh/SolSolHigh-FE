import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormTitle } from '.';

const meta = {
  title: 'UI/Molecules/FormTitle',
  component: FormTitle,
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
    keyword: {
      description: '키워드',
    },
    ment: {
      description: '멘트',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof FormTitle>;

export default meta;

type Story = StoryObj<typeof FormTitle>;

export const Default: Story = {
  args: {
    keyword: '닉네임',
    ment: '을 알려주세요!',
  },
  render: (args) => {
    return <FormTitle {...args} />;
  },
};
