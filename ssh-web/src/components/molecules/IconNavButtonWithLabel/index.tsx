import React from 'react';
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
import { IPath } from '../../../interfaces/routerInterface';
import { PathNames } from '../../../utils/router';

const IconNavButtonWithLabel = ({ pathName }: { pathName: IPath }) => {
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <button className="">
      <Link to={pathName.path}>
        <Icon
          size="md"
          classNameStyles={`${currentPathname === pathName.path ? '!text-primary-600' : '!text-secondary-300'} transition-colors duration-200`}
        >
          {pathName.path === PathNames.HOME.path && <HiMiniHome />}
          {pathName.path === PathNames.MISSION.path && <HiCheckCircle />}
          {pathName.path === PathNames.QUIZ.path && <HiPuzzlePiece />}
          {pathName.path === PathNames.EGG.path && <HiChartBarSquare />}
          {pathName.path === PathNames.MYPAGE.path && <HiSquares2X2 />}
        </Icon>
        <Typography size="xs" color="dark" classNameStyles="cursor-default">
          {pathName.name}
        </Typography>
      </Link>
    </button>
  );
};

export default IconNavButtonWithLabel;
