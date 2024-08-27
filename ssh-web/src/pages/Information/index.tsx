import React from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { containerStyles, contentStyles } from './styles';
import { CircularImage } from '../../components/atoms/CircularImage';
import { InfoList } from '../../components/molecules/InfoList';

export const Information = () => {
  return (
    <div className={containerStyles()}>
      <Mascot nickname="닉네임" ment="무엇이 궁금하신가요?" />
      <div className={contentStyles()}>
        <CircularImage
          imageUrl="/assets/images/samples/parent/man1.png"
          altText="부모님 이미지"
          size="xl"
        />
        <InfoList
          type="info"
          title="내 정보"
          infos={[
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
          ]}
          hasMore={false}
        />
        <InfoList
          type="mascot"
          title="자녀 정보"
          mascots={[
            {
              src: '/assets/images/samples/children/boy1.png',
              label: '아들 닉네임',
            },
            {
              src: '/assets/images/samples/children/girl1.png',
              label: '딸 닉네임',
            },
          ]}
          hasMore
        />
      </div>
    </div>
  );
};
