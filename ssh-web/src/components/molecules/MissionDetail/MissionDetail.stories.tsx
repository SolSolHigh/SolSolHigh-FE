import type { Meta, StoryObj } from '@storybook/react';
import { MissionDetail } from './index';
import { IMission } from '../../../interfaces/missionInterface';
import { EResize } from '../../../themes/themeBase';

const meta: Meta<typeof MissionDetail> = {
  title: 'UI/Molecules/MissionDetail',
  component: MissionDetail,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    mission: {
      description: '미션 데이터 객체',
      control: 'object',
    },
    size: {
      description: '플랫폼에 따른 사이즈',
      control: {
        type: 'radio',
        options: [EResize.M, EResize.T, EResize.D],
      },
    },
    role: {
      description: '사용자 역할 (부모 또는 자식)',
      control: {
        type: 'radio',
        options: ['parent', 'child'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MissionDetail>;

const completedMission: IMission = {
  missionId: 1,
  description: '양치하기',
  isFinished: true,
  missionStartAt: '2026-02-04 06:20:20',
  missionEndAt: '2026-02-04 06:30:20',
  missionFinishedAt: '2026-02-04 06:25:20',
  missionLevel: '1',
  childInfo: {
    childId: 1,
    name: '차은우',
    nickname: '은우', // 여기에 nickname 필드 추가
  },
};

const activeMission: IMission = {
  missionId: 2,
  description: '책 읽기',
  isFinished: false,
  missionStartAt: '2026-02-04 07:00:00',
  missionEndAt: '2026-02-04 07:30:00',
  missionFinishedAt: null,
  missionLevel: '2',
  childInfo: {
    childId: 2,
    name: '고영희',
    nickname: '영희', // 여기에 nickname 필드 추가
  },
};

// 부모 역할을 위한 스토리
export const ParentRoleCompletedMission: Story = {
  args: {
    mission: completedMission,
    size: EResize.D,
    role: 'parent',
  },
};

export const ParentRoleActiveMission: Story = {
  args: {
    mission: activeMission,
    size: EResize.D,
    role: 'parent',
  },
};

export const ChildRoleCompletedMission: Story = {
  args: {
    mission: completedMission,
    size: EResize.D,
    role: 'child',
  },
};

export const ChildRoleActiveMission: Story = {
  args: {
    mission: activeMission,
    size: EResize.D,
    role: 'child',
  },
};
