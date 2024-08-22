import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { resizeState } from '../atoms/resize';
import { BreakPoints, EResize } from '../themes/themeBase';

export const useResizeDetection = () => {
  const [screen, setScreen] = useState(window.outerWidth);
  const [size, setSize] = useRecoilState(resizeState);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screen <= BreakPoints.MOB) {
      setSize(EResize.M);
    } else if (screen <= BreakPoints.TABLET) {
      setSize(EResize.T);
    } else if (screen >= BreakPoints.DESKTOP) {
      setSize(EResize.D);
    }
    console.log('resized', screen, size);
  }, [screen, setSize]);

  return size;
};
