import { Typography } from '../../atoms/Typography';
import { AddPromiseCardProps } from './AddPromiseCard.types';

export const AddPromiseCard = ({ handleModal }: AddPromiseCardProps) => {
  return (
    <div className="flex justify-center cursor-pointer">
      <div
        className="flex flex-col p-4 bg-primary-100 items-center w-32 h-48 rounded-lg shadow-md opacity-50 hover:opacity-100 transition-opacity duration-300"
        onClick={handleModal}
      >
        <div className="w-24 h-24 bg-secondary-300 rounded-lg flex items-center justify-center">
          <span className="text-lg text-secondary-700">+</span>
        </div>
        <div className="text-center">
          <Typography color="dark" size="sm" classNameStyles="mt-4 text-center">
            약속 요청하기
          </Typography>
        </div>
      </div>
    </div>
  );
};
