import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { containerStyles, contentStyles } from './styles';
import {
  findChildByNickname,
  getUserInfo,
  requestChild,
} from '../../../apis/userApi';
import { Mascot } from '../../../components/molecules/Mascot';
import { infoBoxStyles } from '../Manage/styles';
import { Icon } from '../../../components/atoms/Icon';
import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../components/atoms/Typography';
import { AvatarWithLabel } from '../../../components/molecules/AvatarWithLabel';
import { getImgSrc } from '../../../utils/userUtil';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import TextField from '../../../components/atoms/TextField';
import { IChild } from '../../../interfaces/userInterface';
import { MascotCard } from '../../../components/molecules/MascotCard';
import { Button } from '../../../components/atoms/Button';
import { showToast } from '../../../utils/toastUtil';

export const RequestFetch = () => {
  const userinfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userinfoQuery.error && !userinfoQuery.isFetching) {
    throw userinfoQuery.error;
  }

  const nav = useNavigate();
  const [nickname, setNickname] = useState<string>('');
  const [child, setChild] = useState<IChild | null>(null);
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(() => e.target.value);
    },
    [nickname],
  );

  const { mutate } = useMutation({
    mutationFn: async (nickname: string) => await requestChild(nickname),
    onSuccess: (res) => {
      showToast('success', res.data.description);
      nav('/manage', { state: { type: userinfoQuery.data.data.type } });
    },
    onError: () => showToast('error', '자식 신청에 실패했습니다'),
  });

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
              <HiChevronLeft
                onClick={() =>
                  nav('/manage', {
                    state: { type: userinfoQuery.data.data.type },
                  })
                }
              />
            </Icon>
            <Typography weight="bold" size="xl" color="dark">
              자녀 초대하기
            </Typography>
          </div>
          <AvatarWithLabel
            imageUrl={getImgSrc(userinfoQuery.data.data.gender, 'PARENT')}
            label={userinfoQuery.data.data.nickname}
            altText="avatarwithlabel"
            size="2xl"
            classNameStyles="mt-4"
          />
          <div className="relative w-full mt-4">
            <TextField label="닉네임" onChange={onChangeNickname} fullWidth />
            <Icon
              color="dark"
              size="sm"
              classNameStyles="absolute top-4 right-4"
            >
              <HiMagnifyingGlass
                onClick={async () => {
                  await findChildByNickname(nickname)
                    .then((res) => setChild(res.data))
                    .catch(() => setChild(null));
                }}
              />
            </Icon>
          </div>
          <div
            className={`w-full mt-4 ${child ? '' : 'flex justify-center items-center p-8'}`}
          >
            {child ? (
              <MascotCard
                key={child.nickname}
                info={child}
                type="CHILD"
                withTrash={false}
              />
            ) : (
              '자녀가 존재하지 않습니다'
            )}
          </div>
        </div>
        <div className="w-full desktop:px-36 tabletB:px-20 mob:px-8 bottom-16">
          <Button
            fullWidth
            onClick={() => {
              if (child) mutate(child.nickname);
              else showToast('error', '초대할 자녀를 검색해주세요');
            }}
          >
            <Typography weight="bold" size="sm" color="light">
              초대하기
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
