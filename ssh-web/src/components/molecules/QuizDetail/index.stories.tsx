import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuizDetail } from './index';
import { EResize } from '../../../themes/themeBase';

const meta = {
  title: 'UI/Molecules/QuizDetail',
  component: QuizDetail,
  parameters: {
    controls: {
      expanded : true
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    description: {
      description: '문제의 설명',
      control: 'text',
    },
    keyword: {
      description: '문제의 키워드',
      control: 'text',
    },
    quizId: {
      table: {
        disable: true,
      }
    },
    size: {
      description: '플랫폼 별 사이즈',
      control: 'radio',
    }
  }
} satisfies Meta<typeof QuizDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
    description: '적금 통장에 한번 넣은 돈은 언제든 자유롭게 출금할 수 있다!',
    keyword: '통장',
    quizId: 1,
    loading: false,
    error: null,
    size : EResize.M,
    children : <></>
  },
};