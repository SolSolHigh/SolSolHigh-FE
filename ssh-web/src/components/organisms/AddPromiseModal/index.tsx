import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';

export const AddPromiseModal = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="flex flex-col items-center align-middle w-[100%] max-w-[24rem]">
        <img
          src="https://files.oaiusercontent.com/file-sFm0UlQ3L0rPVcPiG27LKwZ5?se=2024-08-27T11%3A45%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Debe569a8-f08f-4ef8-9b8a-470be2a957cc.webp&sig=gAkWuLLCcsz9UDBvdC/2sWg3bAoVWepodxnUL43CcSs%3D"
          className="rounded-2xl shadow-lg w-[90%] max-w-[24rem]"
        />
        <Typography
          color="dark"
          size="4xl"
          weight="bold"
          classNameStyles="text-center mt-2"
        >
          약속
        </Typography>
        <textarea className="rounded-lg mt-2 w-[100%] h-[6rem] shadow-lg border-secondary-800"></textarea>
        <Typography
          size="2xl"
          color="dark"
          weight="semibold"
          classNameStyles="text-center mt-4"
        >
          하기를 부모님과{' '}
          <Typography
            size="2xl"
            color="primary"
            weight="semibold"
            classNameStyles="text-center inline"
          >
            약속
          </Typography>
          해요
        </Typography>
        <Button
          color="primary"
          size="md"
          fullWidth={true}
          classNameStyles="mt-4"
        >
          <Typography color="light" weight="bold" size="xl">
            약속하기
          </Typography>
        </Button>
      </div>
    </div>
  );
};
