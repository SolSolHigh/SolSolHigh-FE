import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MissionCard } from '../MissionCard';

const meta: Meta<typeof MissionCard> = {
  title: 'UI/Molecules/MissionCard',
  component: MissionCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mission: {
      description: '미션 데이터를 전달합니다.',
      control: 'object',
    },
    onClick: {
      description: '클릭 시 동작할 함수',
      action: 'clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MissionCard>;

export const MissionStates: Story = {
  render: (args) => (
    <div>
      <h3>도전 중인 미션</h3>
      <div style={{ marginBottom: '2rem' }}>
        <MissionCard
          {...args}
          mission={{
            missionId: 1,
            description: '양치하고 세수하기',
            isFinished: false,
            missionStartAt: '2026-02-04 06:20:20',
            missionEndAt: '2026-02-04 06:20:20',
            missionFinishedAt: null,
            missionLevel: '1',
            childInfo: {
              childId: 1,
              name: '차은우',
            },
          }}
        />
      </div>
      <h3>완료된 미션</h3>
      <div>
        <MissionCard
          {...args}
          mission={{
            missionId: 2,
            description: '책 읽기',
            isFinished: true,
            missionStartAt: '2026-02-04 06:20:20',
            missionEndAt: '2026-02-04 06:20:20',
            missionFinishedAt: '2026-02-04 08:20:20',
            missionLevel: '3',
            childInfo: {
              childId: 2,
              name: '이슬기',
            },
          }}
        />
      </div>
    </div>
  ),
};

export const MissionInDifferentWidths: Story = {
  render: (args) => (
    <div>
      <h3>좁은 화면에서의 미션 카드</h3>
      <div style={{ width: '500px', marginBottom: '2rem' }}>
        <MissionCard
          {...args}
          mission={{
            missionId: 3,
            description: '방 청소하기',
            isFinished: false,
            missionStartAt: '2026-02-04 07:00:00',
            missionEndAt: '2026-02-04 09:00:00',
            missionFinishedAt: null,
            missionLevel: '2',
            childInfo: {
              childId: 3,
              name: '박소연',
            },
          }}
        />
      </div>
      <h3>넓은 화면에서의 미션 카드</h3>
      <div style={{ width: '1000px' }}>
        <MissionCard
          {...args}
          mission={{
            missionId: 4,
            description: '숙제하기',
            isFinished: true,
            missionStartAt: '2026-02-04 10:00:00',
            missionEndAt: '2026-02-04 12:00:00',
            missionFinishedAt: '2026-02-04 11:30:00',
            missionLevel: '2',
            childInfo: {
              childId: 4,
              name: '김유진',
            },
          }}
        />
      </div>
    </div>
  ),
};
