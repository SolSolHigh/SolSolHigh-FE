import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserInfoForm } from '.';

const meta = {
  title: 'UI/Organisms/UserInfoForm',
  component: UserInfoForm,
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
} satisfies Meta<typeof UserInfoForm>;

export default meta;

type Story = StoryObj<typeof UserInfoForm>;

export const Default: Story = {
  args: {},
  render: () => {
    return <UserInfoForm />;
  },
};
