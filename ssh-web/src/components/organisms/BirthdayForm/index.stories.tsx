import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BirthdayForm } from '.';

const meta = {
  title: 'UI/Organisms/BirthdayForm',
  component: BirthdayForm,
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
      description: '',
    },
    classNameStyles: {
      description: '부가적인 스타일',
    },
  },
} satisfies Meta<typeof BirthdayForm>;

export default meta;

type Story = StoryObj<typeof BirthdayForm>;

export const Default: Story = {
  args: {},
  render: () => {
    return <>birthday form</>;
  },
};
