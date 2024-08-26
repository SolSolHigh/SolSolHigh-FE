import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfoList } from '.';

const meta = {
  title: 'UI/Molecules/InfoList',
  component: InfoList,
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
} satisfies Meta<typeof InfoList>;

export default meta;

type Story = StoryObj<typeof InfoList>;

export const Default: Story = {
  args: {
    infos: [
      {
        label: '이름',
        content: '최요하',
      },
      {
        label: '닉네임',
        content: '닉네임입니다',
      },
      {
        label: '생년월일',
        content: '1999.03.13',
      },
    ],
    mascotType: '자녀',
    mascots: [
      {
        src: '/assets/images/samples/children/boy1.png',
        label: '아들 닉네임',
      },
      {
        src: '/assets/images/samples/children/girl1.png',
        label: '딸 닉네임',
      },
    ],
  },
  render: (args) => {
    return (
      <>
        <div className="m-10 border-2 border-secondary-300 w-80">
          <InfoList {...args} type="info" title="내 정보" />
        </div>
        <div className="m-10 border-2 border-secondary-300 w-80">
          <InfoList {...args} type="mascot" title="자녀 정보" />
        </div>
        <div className="m-10 border-2 border-secondary-300 w-80">
          <InfoList
            {...args}
            type="mascot"
            title="부모 정보"
            mascots={[
              {
                src: '/assets/images/samples/parent/man1.png',
                label: '부모 닉네임',
              },
            ]}
          />
        </div>
        <div className="m-10 border-2 border-secondary-300 w-80">
          <InfoList {...args} type="mascot" title="자녀 정보" mascots={[]} />
        </div>
      </>
    );
  },
};
