import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleTab } from './index';

const meta: Meta<typeof ToggleTab> = {
  title: 'UI/Atoms/ToggleTab',
  component: ToggleTab,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    activeTab: {
      control: 'number',
      description: '현재 활성화된 탭의 인덱스',
    },
    labels: {
      control: 'object',
      description: '탭에 표시될 라벨 배열',
    },
    outlined: {
      control: 'boolean',
      description: '탭의 outlined 스타일 여부',
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'dark', 'danger'],
      },
      description: '탭의 색상',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleTab>;

export const ByColor: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab);
    return (
      <>
        {['primary', 'dark', 'danger'].map((color) => (
          <div
            key={color}
            style={{
              width: '100%',
              maxWidth: '1000px',
              minWidth: '500px',
              margin: '0 auto',
              marginBottom: '20px',
            }}
          >
            <ToggleTab
              activeTab={activeTab}
              onTabChange={setActiveTab}
              labels={args.labels}
              outlined={args.outlined}
              color={color as 'primary' | 'dark' | 'danger'}
            />
          </div>
        ))}
      </>
    );
  },
  args: {
    activeTab: 0,
    labels: ['오늘의 계란이에요', '내가 가진 계란을 봐요'],
    outlined: false,
    color: 'primary',
  },
};

export const ByOutlined: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab);
    return (
      <>
        {[false, true].map((outlined) => (
          <div
            key={outlined ? 'outlined' : 'not-outlined'}
            style={{
              width: '100%',
              maxWidth: '1000px',
              minWidth: '500px',
              margin: '0 auto',
              marginBottom: '20px',
            }}
          >
            <ToggleTab
              activeTab={activeTab}
              onTabChange={setActiveTab}
              labels={args.labels}
              outlined={outlined}
              color={args.color}
            />
          </div>
        ))}
      </>
    );
  },
  args: {
    activeTab: 0,
    labels: ['오늘의 계란이에요', '내가 가진 계란을 봐요'],
    outlined: false,
    color: 'primary',
  },
};

export const ByParentContainerSizes: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab);
    return (
      <>
        <div
          style={{
            width: '1000px',
            maxWidth: '1000px',
            minWidth: '500px',
            margin: '0 auto',
            marginBottom: '20px',
          }}
        >
          <ToggleTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            labels={args.labels}
            outlined={args.outlined}
            color={args.color}
          />
        </div>
        <div
          style={{
            width: '700px',
            maxWidth: '700px',
            minWidth: '500px',
            margin: '0 auto',
            marginBottom: '20px',
          }}
        >
          <ToggleTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            labels={args.labels}
            outlined={args.outlined}
            color={args.color}
          />
        </div>
        <div
          style={{
            width: '500px',
            maxWidth: '500px',
            minWidth: '500px',
            margin: '0 auto',
          }}
        >
          <ToggleTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            labels={args.labels}
            outlined={args.outlined}
            color={args.color}
          />
        </div>
      </>
    );
  },
  args: {
    activeTab: 0,
    labels: ['오늘의 계란이에요', '내가 가진 계란을 봐요'],
    outlined: false,
    color: 'primary',
  },
};
