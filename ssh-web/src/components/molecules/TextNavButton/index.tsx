import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from '../../atoms/Typography';
import { IPath } from '../../../interfaces/routerInterface';

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

export default TextNavButton;
