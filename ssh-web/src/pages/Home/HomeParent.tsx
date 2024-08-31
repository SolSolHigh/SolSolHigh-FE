import React, { useEffect, useState } from 'react';
import { IChild, IUserInfo } from '../../interfaces/userInterface';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './styles';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyChildren } from '../../apis/userApi';
import { Typography } from '../../components/atoms/Typography';
import { getChildExpRecords } from '../../apis/experienceApi';
import { IChildExpRecord } from '../../interfaces/experienceInterface';
import { Icon } from '../../components/atoms/Icon';
import { getImgSrc, getImgSrcByType } from '../../utils/userUtil';
import { useNavigate } from 'react-router-dom';

export interface HomeParentProps {
  parent: IUserInfo;
}

export const HomeParent = ({ parent }: HomeParentProps) => {
  const childrenQuery = useSuspenseQuery({
    queryKey: ['children'],
    queryFn: async () => await getMyChildren(),
  });

  const [idx, setIdx] = useState<number>(0);
  const [records, setRecords] = useState<IChildExpRecord[]>([]);

  useEffect(() => {
    getChildExpRecords(childrenQuery.data.data[idx].nickname)
      .then((res) => setRecords(() => [...res.data]))
      .catch((err) => console.log(err));
  }, [idx]);

  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-auto tablet:flex-col">
      <Mascot
        nickname={parent.nickname}
        ment="반가워요!"
        classNameStyles="tablet:hidden"
      />
      <div className={`${contentStyles()}`}>
        {childrenQuery.data.data.length ? (
          <>
            <div className="flex w-full max-w-[30rem] gap-x-4">
              {childrenQuery.data.data.map((child: IChild, i: number) => {
                return (
                  <div
                    className={`flex items-center p-2 gap-x-2 border ${idx === i ? 'border-secondary-500' : 'border-secondary-300'} rounded-full`}
                    key={child.nickname}
                    onClick={() => setIdx(i)}
                  >
                    <img
                      src={getImgSrc(child.gender, 'CHILD')}
                      className="w-6 h-6 -translate-y-0.5"
                    />
                    <Typography color="dark" size="sm">
                      {child.nickname}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div className="w-full max-w-[30rem] flex justify-between gap-x-4 mt-4">
              <div
                className="flex min-h-[7rem] justify-between w-7/12 p-4 bg-primary-900 rounded-2xl transition ease-in-out delay-100 hover:scale-105"
                onClick={() => nav('/account')}
              >
                <Typography color="light" size="sm" weight="bold">
                  용돈
                  <br />
                  송금하기
                </Typography>
                <div className="flex items-end h-full">
                  <img
                    src="/assets/images/experience/online-money-saving.png"
                    className="h-12"
                  />
                </div>
              </div>
              <div
                className="flex min-h-[7rem] justify-between w-5/12 p-4 bg-primary-400 rounded-2xl transition ease-in-out delay-100 hover:scale-105"
                onClick={() => nav('/mission')}
              >
                <Typography color="light" size="sm" weight="bold">
                  미션
                  <br />
                  관리하기
                </Typography>
                <div className="flex items-end h-full">
                  <img
                    src="/assets/images/experience/bank-check.png"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[30rem] flex justify-between gap-x-4 mt-4">
              <div
                className="flex min-h-[7rem] justify-between w-5/12 p-4 bg-primary-300 rounded-2xl transition ease-in-out delay-100 hover:scale-105"
                onClick={() => nav('/promise')}
              >
                <Typography color="light" size="sm" weight="bold">
                  약속권
                  <br />
                  관리하기
                </Typography>
                <div className="flex items-end h-full">
                  <img
                    src="/assets/images/experience/pingky-promise-hand-gesture.png"
                    className="h-12"
                  />
                </div>
              </div>
              <div
                className="flex min-h-[7rem] justify-between w-7/12 p-4 bg-primary-700 rounded-2xl transition ease-in-out delay-100 hover:scale-105"
                onClick={() => nav('/account')}
              >
                <Typography color="light" size="sm" weight="bold">
                  계좌
                  <br />
                  관리하기
                </Typography>
                <div className="flex items-end h-full">
                  <img
                    src="/assets/images/experience/send-money.png"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[30rem] max-h-72 flex-1 overflow-y-scroll rounded-xl bg-white shadow shadow-secondary-300 p-8 mt-8">
              <Typography size="sm" weight="bold" classNameStyles="inline">
                {childrenQuery.data.data[idx].nickname}
              </Typography>
              <Typography
                size="sm"
                weight="bold"
                color="dark"
                classNameStyles="inline"
              >
                님의
              </Typography>
              <Typography size="sm" weight="bold" color="dark">
                최근 활동이에요
              </Typography>
              {records.map((record: IChildExpRecord, i: number) => {
                return (
                  <div className="w-full mt-4" key={i}>
                    <Typography
                      size="2xs"
                      weight="bold"
                      classNameStyles="text-secondary-300"
                    >
                      {record.time}
                    </Typography>
                    <div className="flex items-center mt-2 gap-x-2">
                      <Icon>{getImgSrcByType(record.type)}</Icon>
                      <Typography color="dark" size="sm" weight="semibold">
                        {record.description}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>자녀가 없을 때 UI</>
        )}
      </div>
    </div>
  );
};
