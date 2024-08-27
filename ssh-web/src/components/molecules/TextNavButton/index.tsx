import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from '../../atoms/Typography';
import { IPath } from '../../../interfaces/routerInterface';

const TextNavButton = ({ pathName }: { pathName: IPath }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;

  const handleClick = () => {
    navigate(pathName.path, { state: { type: 'parent' } });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Typography
        size="sm"
        classNameStyles={`${currentPathname === pathName.path ? 'text-primary-600 font-semibold' : '!text-black hover:!text-primary-400 hover:!font-semibold'} transition-all duration-300`}
      >
        {pathName.name}
      </Typography>
    </div>
  );
};

export default TextNavButton;
