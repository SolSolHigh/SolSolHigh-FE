import React from 'react';
import { useRecoilValue } from 'recoil';
import { resizeState } from '../../../atoms/resize';

import { Icon } from '../../atoms/Icon';
import IconNavButtonWithLabel from '../../molecules/IconNavButtonWithLabel';
import TextNavButton from '../../molecules/TextNavButton';

import { MdOutlineNotifications } from 'react-icons/md';
import { PathNames } from '../../../utils/router';
import { EResize } from '../../../themes/themeBase';

export interface NavigationBarProps {
  bgColor?: string;
}

const baseLayoutStyles = 'z-30 fixed w-full';

const NavigationBar = ({ bgColor = 'bg-white' }: NavigationBarProps) => {
  const size = useRecoilValue<EResize>(resizeState);

  return (
    <>
      {(size === EResize.M || size === EResize.T) && (
        <>
          <div
            className={`MOB-NOTIFICATION-BAR tablet:h-8 desktop:h-14 px-5 animate-popIn w-full sticky top-0 ${bgColor} z-30`}
          >
            <div className="flex items-end justify-end w-full h-full py-2">
              <Icon classNameStyles="text-primary-400">
                <MdOutlineNotifications />
              </Icon>
            </div>
          </div>
          <div
            className={`MOB-NAVIGATION-BAR bottom-0 h-16 !bg-white border rounded-t-3xl animate-popIn ${baseLayoutStyles}`}
          >
            <div className="w-full h-full px-6 BOX">
              <div
                className={`ICON-GROUP flex flex-row mobile:gap-3 mobile:justify-evenly tablet:justify-center tablet:gap-12 items-center text-center w-full h-full`}
              >
                <IconNavButtonWithLabel pathName={PathNames.HOME} />
                <IconNavButtonWithLabel pathName={PathNames.MISSION} />
                <IconNavButtonWithLabel pathName={PathNames.QUIZ} />
                <IconNavButtonWithLabel pathName={PathNames.EGG} />
                <IconNavButtonWithLabel
                  pathName={{ path: '/menu', name: '메뉴' }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {size === EResize.D && (
        <div
          className={`top-0 h-14 border-b-2 border-secondary-200 z-30 sticky w-full`}
        >
          <div className="flex flex-row items-center justify-center w-full h-full gap-12 bg-white DESKTOP-NAVIGATION-BAR">
            <TextNavButton pathName={PathNames.HOME} />
            <TextNavButton pathName={PathNames.MISSION} />
            <TextNavButton pathName={PathNames.QUIZ} />
            <TextNavButton pathName={PathNames.EGG} />
            <TextNavButton pathName={{ path: '/menu', name: '메뉴' }} />
            <div className="absolute flex items-center py-2 right-12 h-max">
              <Icon
                size="md"
                classNameStyles="text-secondary-600 hover:text-primary-600 transition-colors duration-300 cursor-pointer"
              >
                <MdOutlineNotifications />
              </Icon>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
