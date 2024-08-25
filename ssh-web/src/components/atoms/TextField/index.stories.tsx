import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextField from './index';
import { TTextFieldState } from './TextField.types';

const meta = {
  title: 'UI/Atoms/TextField',
  component: TextField,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      description: '표시할 placeholder 및 label',
      control: 'text',
    },
    state: {
      description: '색상',
    },
    size: {
      description: 'TextField의 전체적인 크기',
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] }, // 드롭다운 선택 가능
    },
    defaultValue: {
      description: '초기값',
      control: 'text',
    },
    variant: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const StateList: TTextFieldState[] = ['primary', 'secondary', 'danger'];

// Outlined 스토리
export const Outlined: Story = {
  args: {
    label: '라벨',
    defaultValue: '',
    size: 'md',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {StateList.map((state) => (
        <TextField {...args} key={state} state={state} variant="outlined" />
      ))}
    </div>
  ),
};

// Standard 스토리
export const Standard: Story = {
  args: {
    label: '라벨',
    defaultValue: '',
    size: 'md',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {StateList.map((state) => (
        <TextField {...args} key={state} state={state} variant="standard" />
      ))}
    </div>
  ),
};
