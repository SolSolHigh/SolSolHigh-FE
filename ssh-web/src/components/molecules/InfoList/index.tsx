import React from 'react';
import { InfoListProps } from './InfoList.types';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { HiChevronRight } from 'react-icons/hi2';
import {
  IUserInfoInfo,
  IUserInfoMascot,
} from '../../../interfaces/userInterface';
import { CircularImage } from '../../atoms/CircularImage';
import { Button } from '../../atoms/Button';
import {
  containerStyles,
  infoStyles,
  isEmptyStyles,
  mascotStyles,
  titleStyles,
} from './InfoList.styles';

export const InfoList = ({
  type,
  title,
  infos,
  mascotType,
  mascots,
  children,
  classNameStyles,
}: InfoListProps) => {
  return (
    <div className={`${containerStyles()} ${classNameStyles}`}>
      {/* 타이틀 */}
      <div className={titleStyles()}>
        <Typography weight="bold" size="sm" color="dark">
          {title}
        </Typography>
        <Icon color="dark" size="sm">
          <HiChevronRight />
        </Icon>
      </div>

      {/* 정보 리스트 */}
      {type === 'info' &&
        infos?.map((info: IUserInfoInfo) => {
          return (
            <div key={info.label} className={infoStyles()}>
              <Typography size="sm" color="dark" classNameStyles="w-1/3">
                {info.label}
              </Typography>
              <Typography size="sm" color="dark">
                {info.content}
              </Typography>
            </div>
          );
        })}

      {/* 마스코트 리스트 */}
      {type === 'mascot' && (
        <div className={mascotStyles()}>
          {mascots?.length ? (
            mascots?.map((mascot: IUserInfoMascot) => {
              return (
                <div
                  key={mascot.label}
                  className={isEmptyStyles({
                    isEmpty: mascots?.length ? true : false,
                  })}
                >
                  <CircularImage
                    imageUrl={mascot.src}
                    altText={mascot.label}
                    size="xl"
                  />
                  <Typography color="dark" size="sm">
                    {mascot.label}
                  </Typography>
                </div>
              );
            })
          ) : (
            <div
              className={isEmptyStyles({
                isEmpty: mascots?.length ? true : false,
              })}
            >
              <Typography color="dark" weight="semibold" size="sm">
                아직 초대된 {mascotType}가 없어요!!
              </Typography>
              <Button size="sm">{mascotType} 초대하기</Button>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
