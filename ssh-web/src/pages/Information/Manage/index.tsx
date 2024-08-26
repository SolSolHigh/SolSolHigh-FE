import React, { useState } from 'react';
import { containerStyles, contentStyles, infoBoxStyles } from './styles';
import { Mascot } from '../../../components/molecules/Mascot';
import { Typography } from '../../../components/atoms/Typography';
import { HiChevronLeft } from 'react-icons/hi2';
import { Icon } from '../../../components/atoms/Icon';
import { AvatarWithLabel } from '../../../components/molecules/AvatarWithLabel';
import { ToggleTab } from '../../../components/atoms/ToggleTab';
import { MascotCard } from '../../../components/molecules/MascotCard';
import { Button } from '../../../components/atoms/Button';

export const Manage = () => {
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
        nickname="닉네임"
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
              <HiChevronLeft />
            </Icon>
            <Typography weight="bold" size="xl" color="dark">
              자녀 정보
            </Typography>
          </div>
          <AvatarWithLabel
            imageUrl="/assets/images/samples/parent/man1.png"
            label="최요하(닉네임입니다)"
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
          <div className="w-full mt-4">
            <MascotCard
              childInfo={{
                name: '자녀1',
                nickname: '자녀1 닉네임',
                birthday: '1999-03-13',
              }}
            />
          </div>
        </div>
        <div className="w-full desktop:px-36 tabletB:px-20 mob:px-8 bottom-16">
          <Button fullWidth>
            <Typography weight="bold" size="sm" color="light">
              자녀 초대하기
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
