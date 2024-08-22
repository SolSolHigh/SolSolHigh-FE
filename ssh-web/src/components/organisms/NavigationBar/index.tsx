import React from 'react';
import { useRecoilValue } from 'recoil';
import { resizeState } from '../../../atoms/resize';

import { Icon } from '../../atoms/Icon';
import IconNavButtonWithLabel from '../../molecules/IconNavButtonWithLabel';
import TextNavButton from '../../molecules/TextNavButton';

import { MdOutlineNotifications } from 'react-icons/md';
import { PathNames } from '../../../utils/router';
import { EResize } from '../../../themes/themeBase';

const baseLayoutStyles = 'z-30 fixed w-full';

const NavigationBar = () => {
  const size = useRecoilValue<EResize>(resizeState);

  return (
    <>
      {(size === EResize.M || size === EResize.T) && (
        <>
          <div
            className={`MOB-NOTIFICATION-BAR h-14 px-5 animate-popIn w-full sticky top-0`}
          >
            <div className="w-full h-full flex justify-end items-end py-2">
              <Icon size="xl" classNameStyles="text-primary-400">
                <MdOutlineNotifications />
              </Icon>
            </div>
          </div>
          <div
            className={`MOB-NAVIGATION-BAR bottom-0 h-16 bg-white border rounded-t-3xl animate-popIn ${baseLayoutStyles}`}
          >
            <div className="BOX w-full h-full px-6">
              <div
                className={`ICON-GROUP flex flex-row mobile:gap-3 mobile:justify-evenly tablet:justify-center tablet:gap-12 items-center text-center w-full h-full`}
              >
                <IconNavButtonWithLabel pathName={PathNames.HOME} />
                <IconNavButtonWithLabel pathName={PathNames.MISSION} />
                <IconNavButtonWithLabel pathName={PathNames.QUIZ} />
                <IconNavButtonWithLabel pathName={PathNames.EGG} />
                <IconNavButtonWithLabel pathName={PathNames.MYPAGE} />
              </div>
            </div>
          </div>
        </>
      )}

      {size === EResize.D && (
        <div
          className={`top-0 h-14 border-b-2 border-secondary-200 ${baseLayoutStyles}`}
        >
          <div className="DESKTOP-NAVIGATION-BAR w-full bg-white h-full flex flex-row justify-center gap-12 items-center">
            <TextNavButton pathName={PathNames.HOME} />
            <TextNavButton pathName={PathNames.MISSION} />
            <TextNavButton pathName={PathNames.QUIZ} />
            <TextNavButton pathName={PathNames.EGG} />
            <TextNavButton pathName={PathNames.MYPAGE} />
            <div className="absolute right-12 h-max flex items-center py-2">
              <Icon
                size="md"
                classNameStyles="text-secondary-600 hover:text-primary-600 transition-colors duration-300  cursor-pointer"
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
