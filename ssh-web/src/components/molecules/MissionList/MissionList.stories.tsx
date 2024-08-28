import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MissionList } from './index';
import { RecoilRoot } from 'recoil';
import { IMission } from '../../../interfaces/missionInterface';

const meta: Meta<typeof MissionList> = {
  title: 'UI/Molecules/MissionList',
  component: MissionList,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    missions: {
      description: '미션 데이터 배열',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MissionList>;

const sampleMissions: IMission[] = [
  {
    missionId: 1,
    description: '양치하기',
    isFinished: true,
    missionStartAt: '2026-02-04 06:20:20',
    missionEndAt: '2026-02-04 06:30:20',
    missionFinishedAt: '2026-02-04 06:25:20',
    missionLevel: '1',
    childInfo: {
      childId: 1,
      name: '홍길동',
      nickname: '길동이',
    },
  },
  {
    missionId: 2,
    description: '책 읽기',
    isFinished: false,
    missionStartAt: '2026-02-04 07:00:00',
    missionEndAt: '2026-02-04 07:30:00',
    missionFinishedAt: null,
    missionLevel: '2',
    childInfo: {
      childId: 2,
      name: '김영희',
      nickname: '영희',
    },
  },
];

export const DefaultMissionList: Story = {
  args: {
    missions: sampleMissions,
  },
};
