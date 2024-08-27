import { useRecoilValue } from 'recoil';
import { EResize } from '../../../themes/themeBase';
import { Typography } from '../../atoms/Typography';
import { cardStyle } from './PromiseItem.styles';
import { PromiseItemProps } from './PromiseItem.types';
import stemp from './stemp.png';
import { resizeState } from '../../../atoms/resize';

export const PromiseItem = ({
  handleModal,
  isConfirm,
  log,
}: PromiseItemProps) => {
  const size = useRecoilValue<EResize>(resizeState);
  return (
    <div className="flex justify-center cursor-pointer w-full">
      <div
        className={cardStyle({ size })}
        onClick={() => {
          handleModal(log);
        }}
      >
        <div className="w-24 h-24 rounded-lg bg-cover bg-center relative">
          {' '}
          {isConfirm && (
            <>
              <div className="absolute bg-black opacity-35 rounded-lg w-24 h-24"></div>
              <img className="absolute w-24 h-24 opacity-100" src={stemp}></img>
            </>
          )}
          <img
            src={log.imageUrl}
            className="w-full h-full bg-red-600 bg-opacity-50 flex items-center justify-center rounded-lg"
          />
        </div>
        <Typography
          color="primary"
          size="sm"
          weight="semibold"
          classNameStyles="mt-4 text-center"
        >
          {log.description}
        </Typography>
      </div>
    </div>
  );
};
