import React, { useState } from 'react';
import { containerStyles, contentStyles, infoBoxStyles } from './styles';
import { Mascot } from '../../../components/molecules/Mascot';
import { Icon } from '../../../components/atoms/Icon';
import { HiChevronLeft } from 'react-icons/hi2';
import { Typography } from '../../../components/atoms/Typography';
import { AvatarWithLabel } from '../../../components/molecules/AvatarWithLabel';
import { ToggleTab } from '../../../components/atoms/ToggleTab';
import { MascotCard } from '../../../components/molecules/MascotCard';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getMyParents,
  getMyWaitingParent,
  getUserInfo,
} from '../../../apis/userApi';
import { IParent, IRequest } from '../../../interfaces/userInterface';
import { useNavigate } from 'react-router-dom';
import { getImgSrc } from '../../../utils/userUtil';

export const ManageParentFetch = () => {
  const [userinfoQuery, parentsQuery, waitingQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getUserInfo(),
      },
      {
        queryKey: ['parents'],
        queryFn: async () => await getMyParents(),
      },
      {
        queryKey: ['waiting'],
        queryFn: async () => await getMyWaitingParent(),
      },
    ],
  });

  [userinfoQuery, parentsQuery, waitingQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabChange = () => {
    setActiveTab((prev) => {
      if (prev) return 0;
      else return 1;
    });
  };
  return (
    <div className={containerStyles()}>
      <Mascot
        nickname={userinfoQuery.data.data.nickname}
        ment="부모 정보가 궁금하시군요!!"
        classNameStyles="tablet:hidden"
      />
      <div className={contentStyles()}>
        <div className={infoBoxStyles()}>
          <div className="flex justify-center w-full">
            <Icon
              color="dark"
              classNameStyles="absolute desktop:left-36 tabletB:left-20 mob:left-8"
            >
              <HiChevronLeft onClick={() => nav('/mypage')} />
            </Icon>
            <Typography weight="bold" size="xl" color="dark">
              부모 정보
            </Typography>
          </div>
          <AvatarWithLabel
            imageUrl={getImgSrc(userinfoQuery.data.data.gender, 'CHILD')}
            label={userinfoQuery.data.data.nickname}
            altText="avatarwithlabel"
            size="2xl"
            classNameStyles="mt-4"
          />
          <div className="w-full mt-4">
            <ToggleTab
              activeTab={activeTab}
              onTabChange={onTabChange}
              labels={['연결된 부모', '신청 대기중']}
              outlined
            />
          </div>
          <div className="flex flex-col w-full mt-4 gap-y-4">
            {(!activeTab
              ? [parentsQuery.data.data]
              : waitingQuery.data.data
            ).map((parent: IParent | IRequest) => {
              return (
                <MascotCard
                  key={parent.nickname}
                  info={parent}
                  type="PARENT"
                  isWaiting={activeTab === 0}
                  withTrash={activeTab === 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
