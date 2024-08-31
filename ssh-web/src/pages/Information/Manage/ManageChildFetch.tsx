import React, { useState } from 'react';
import { containerStyles, contentStyles, infoBoxStyles } from './styles';
import { Mascot } from '../../../components/molecules/Mascot';
import { Icon } from '../../../components/atoms/Icon';
import { HiChevronLeft } from 'react-icons/hi2';
import { Typography } from '../../../components/atoms/Typography';
import { AvatarWithLabel } from '../../../components/molecules/AvatarWithLabel';
import { ToggleTab } from '../../../components/atoms/ToggleTab';
import { MascotCard } from '../../../components/molecules/MascotCard';
import { Button } from '../../../components/atoms/Button';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getMyChildren,
  getMyWaitingChildren,
  getUserInfo,
} from '../../../apis/userApi';
import { IChild, IRequest } from '../../../interfaces/userInterface';
import { useNavigate } from 'react-router-dom';
import { getImgSrc } from '../../../utils/userUtil';

export const ManageChildFetch = () => {
  const [userinfoQuery, childrenQuery, waitingQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getUserInfo(),
      },
      {
        queryKey: ['children'],
        queryFn: async () => await getMyChildren(),
      },
      {
        queryKey: ['waiting'],
        queryFn: async () => await getMyWaitingChildren(),
      },
    ],
  });

  [userinfoQuery, childrenQuery, waitingQuery].some((query) => {
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
        ment="자녀 정보가 궁금하시군요!!"
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
              자녀 정보
            </Typography>
          </div>
          <AvatarWithLabel
            imageUrl={getImgSrc(userinfoQuery.data.data.gender, 'PARENT')}
            label={userinfoQuery.data.data.nickname}
            altText="avatarwithlabel"
            size="2xl"
            classNameStyles="mt-4"
          />
          <div className="w-full mt-4">
            <ToggleTab
              activeTab={activeTab}
              onTabChange={onTabChange}
              labels={['등록된 자녀', '등록 대기중']}
              outlined
            />
          </div>
          <div className="flex flex-col w-full mt-4 gap-y-4">
            {(!activeTab
              ? childrenQuery.data.data
              : waitingQuery.data.data
            ).map((child: IChild | IRequest) => {
              return (
                <MascotCard
                  key={child.nickname}
                  info={child}
                  type="CHILD"
                  isWaiting={activeTab ? true : false}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full desktop:px-36 tabletB:px-20 mob:px-8 bottom-16">
          <Button fullWidth onClick={() => nav('/request')}>
            <Typography weight="bold" size="sm" color="light">
              자녀 초대하기
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
