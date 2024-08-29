import React from 'react';
import { Icon } from '../../atoms/Icon';
import IconNavButtonWithLabel from '../../molecules/IconNavButtonWithLabel';
import TextNavButton from '../../molecules/TextNavButton';
import { MdOutlineNotifications } from 'react-icons/md';
import { PathNames } from '../../../utils/router';
import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { getHasBottom, getNavHasBack } from '../../../utils/appUtil';

export interface NavigationBarProps {
  bgColor?: string;
  path: string;
}

const NavigationBar = ({ bgColor = 'bg-white', path }: NavigationBarProps) => {
  const nav = useNavigate();
  return (
    <>
      <div
        className={`tablet:h-12 desktop:h-14 px-5 animate-popIn w-full sticky top-0 ${bgColor} z-30 desktop:hidden`}
      >
        <div
          className={`flex ${getNavHasBack(path) ? 'items-center justify-between' : 'items-end justify-end'} w-full h-full py-2`}
        >
          <Icon className="text-primary-400">
            <HiChevronLeft onClick={() => nav(-1)} />
          </Icon>
          <Icon classNameStyles="text-primary-400">
            <MdOutlineNotifications />
          </Icon>
        </div>
      </div>
      {getHasBottom(path) && (
        <div className="bottom-0 h-16 !bg-white border rounded-t-3xl animate-popIn z-30 fixed w-full desktop:hidden">
          <div className="w-full h-full px-6">
            <div className="flex flex-row items-center w-full h-full text-center mobile:gap-3 mobile:justify-evenly tablet:justify-center tablet:gap-12">
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
      )}

      <div className="sticky top-0 z-30 w-full border-b-2 h-14 border-secondary-200 tablet:hidden">
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
    </>
  );
};

export default NavigationBar;
