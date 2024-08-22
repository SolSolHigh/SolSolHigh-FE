import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { resizeState } from '../../../atoms/resize';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../atoms/Icon';
import {
  HiChartBarSquare,
  HiCheckCircle,
  HiMiniHome,
  HiPuzzlePiece,
  HiSquares2X2,
} from 'react-icons/hi2';
import { Typography } from '../../atoms/Typography';
import { MdOutlineNotifications } from 'react-icons/md';

const BreakPoints = {
  MOB: 480,
  TABLET: 759,
  DESKTOP: 1239,
};

const PathNames = {
  HOME: {
    path: '/home',
    name: '홈',
  },
  MISSION: {
    path: '/mission',
    name: '미션',
  },
  QUIZ: { path: '/quiz', name: '퀴즈' },
  EGG: { path: '/egg', name: '계란' },
  MYPAGE: {
    path: '/mypage',
    name: '전체',
  },
};

interface IPath {
  path: string;
  name: string;
}

const NavigationBar = () => {
  const [screen, setScreen] = useState(window.outerWidth);
  const [size, setSize] = useRecoilState(resizeState);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };

    window.addEventListener('resize', handleResize);

    if (screen <= BreakPoints.MOB) {
      setSize('M');
    } else if (screen <= BreakPoints.TABLET && screen > BreakPoints.MOB) {
      setSize('T');
    } else if (screen > BreakPoints.TABLET) {
      setSize('D');
    }
  }, [screen]);

  return (
    <div className="z-30">
      {(size === 'M' || size === 'T') && (
        <>
          <div className="MOB-NOTIFICATION-BAR w-full absolute top-0 h-24 px-5 animate-popIn">
            <div className="w-full h-full flex justify-end items-end py-2">
              <Icon size="xl" classNameStyles="text-primary-400">
                <MdOutlineNotifications />
              </Icon>
            </div>
          </div>
          <div className="MOB-NAVIGATION-BAR absolute bottom-0 h-32 w-full bg-white border border- rounded-t-3xl animate-popIn">
            <div className="BOX w-full h-full px-6">
              <div className="ICON-GROUP flex flex-row gap-4 justify-evenly tablet:!justify-evenly items-center text-center w-full h-full">
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

      {size === 'D' && (
        <div className="absolute top-0 w-full h-16 border-2 border-secondary-200">
          <div className="w-full h-full flex flex-row justify-center gap-12 items-center">
            <TextNavButton pathName={PathNames.HOME} />
            <TextNavButton pathName={PathNames.MISSION} />
            <TextNavButton pathName={PathNames.QUIZ} />
            <TextNavButton pathName={PathNames.EGG} />
            <TextNavButton pathName={PathNames.MYPAGE} />
            <div className=" absolute right-12 h-max flex items-center py-2">
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
    </div>
  );
};

export default NavigationBar;

const TextNavButton = ({ pathName }: { pathName: IPath }) => {
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <Link to={pathName.path}>
      <Typography
        size="sm"
        classNameStyles={`${currentPathname === pathName.path ? 'text-primary-600 font-semibold' : '!text-black hover:!text-primary-400 hover:!font-semibold'} transition-all duration-300 cursor-pointer`}
      >
        {pathName.name}
      </Typography>
    </Link>
  );
};

// ===================
const IconNavButtonWithLabel = ({ pathName }: { pathName: IPath }) => {
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <button>
      <Link to={pathName.path}>
        <Icon
          size="2xl"
          classNameStyles={`${currentPathname === pathName.path ? '!text-primary-600' : '!text-secondary-300'} transition-colors duration-200`}
        >
          {pathName.path === PathNames.HOME.path && <HiMiniHome />}
          {pathName.path === PathNames.MISSION.path && <HiCheckCircle />}
          {pathName.path === PathNames.QUIZ.path && <HiPuzzlePiece />}
          {pathName.path === PathNames.EGG.path && <HiChartBarSquare />}
          {pathName.path === PathNames.MYPAGE.path && <HiSquares2X2 />}
        </Icon>
        <Typography size="sm" color="dark" classNameStyles="cursor-default">
          {pathName.name}
        </Typography>
      </Link>
    </button>
  );
};
