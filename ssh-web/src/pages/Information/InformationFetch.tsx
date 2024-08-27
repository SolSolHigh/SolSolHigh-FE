import React, { useEffect, useState } from 'react';
import { containerStyles, contentStyles } from './styles';
import { CircularImage } from '../../components/atoms/CircularImage';
import { Mascot } from '../../components/molecules/Mascot';
import { InfoList } from '../../components/molecules/InfoList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyChildren, getMyParents, getUserInfo } from '../../apis/userApi';
import { getImgSrc } from '../../utils/userUtil';
import dayjs from 'dayjs';
import { IChild, IUserInfoMascot } from '../../interfaces/userInterface';

export const InformationFetch = () => {
  const userinfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userinfoQuery.error && !userinfoQuery.isFetching) {
    throw userinfoQuery.error;
  }

  const [related, setRelated] = useState<IUserInfoMascot[]>([]);

  useEffect(() => {
    if (userinfoQuery.data.data.type === 'PARENT') {
      getMyChildren()
        .then((res) => {
          setRelated(() => {
            const newRelated: IUserInfoMascot[] = [];
            res.data.forEach((child: IChild) => {
              const newUserInfoMascot: IUserInfoMascot = {
                src: getImgSrc(child.gender, 'CHILD'),
                label: child.nickname,
              };
              newRelated.push(newUserInfoMascot);
            });
            return newRelated;
          });
        })
        .catch((err) => console.log(err));
    } else {
      getMyParents().then((res) => {
        setRelated(() => {
          const newUserInfoMascot: IUserInfoMascot = {
            src: getImgSrc(res.data.gender, 'PARENT'),
            label: res.data.nickname,
          };
          return [newUserInfoMascot];
        });
      });
    }
  }, []);

  return (
    <div className={containerStyles()}>
      <Mascot
        nickname={userinfoQuery.data.data.nickname}
        ment="무엇이 궁금하신가요?"
      />
      <div className={contentStyles()}>
        <CircularImage
          imageUrl={getImgSrc(
            userinfoQuery.data.data.gender,
            userinfoQuery.data.data.type,
          )}
          altText={userinfoQuery.data.data.nickname}
          size="xl"
        />
        <InfoList
          type="info"
          title="내 정보"
          infos={[
            {
              label: '이름',
              content: userinfoQuery.data.data.name,
            },
            {
              label: '닉네임',
              content: userinfoQuery.data.data.nickname,
            },
            {
              label: '생년월일',
              content: dayjs(userinfoQuery.data.data.birthday).format(
                'YYYY년 MM월 DD일',
              ),
            },
          ]}
          hasMore={false}
        />
        <InfoList
          type="mascot"
          title={`${userinfoQuery.data.data.type === 'PARENT' ? '자녀' : '부모'} 정보`}
          mascots={related}
          mascotType={userinfoQuery.data.data.type}
          hasMore={userinfoQuery.data.data.type === 'PARENT'}
        />
      </div>
    </div>
  );
};
