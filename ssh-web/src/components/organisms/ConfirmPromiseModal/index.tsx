import React, { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { resizeState } from '../../../atoms/resize';
import { EResize } from '../../../themes/themeBase';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { ConfirmPromiseModalProps } from './ConfirmPromiseModal.types';
import { MdCancel } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';

export const ConfirmPromiseModal = ({
  log,
  onUpload,
}: ConfirmPromiseModalProps) => {
  const [uploadImgUrl, setUploadImgUrl] = useState<File | null>(null);
  const size = useRecoilValue<EResize>(resizeState);

  const onChangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUploadImgUrl(file);
    }
  };

  const handleDelete = () => {
    setUploadImgUrl(null);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col items-center align-middle w-full max-w-[24rem] relative">
        {uploadImgUrl ? (
          <div className="relative mb-4 group" onClick={() => handleDelete()}>
            <img
              src={uploadImgUrl ? URL.createObjectURL(uploadImgUrl) : ''}
              className="w-96 h-96 border-2 hover:opacity-60  border-gray-400 rounded-xl object-cover cursor-pointer shadow-lg md:w-32 md:h-32"
              alt="uploaded"
            />
            <MdCancel
              size={36}
              className="absolute left-[88%] bottom-[88%] bg-gray-600 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
            />
          </div>
        ) : (
          <label htmlFor="file" className="cursor-pointer group">
            <img
              src={
                process.env.PUBLIC_URL + 'assets/images/common/defaultImg.webp'
              }
              className="w-96 h-96 border-2 hover:opacity-75  border-secondary-500 rounded-xl bg-secondary-100 cursor-pointer shadow-lg md:w-32 md:h-32"
              alt="Add"
            />
            <MdAddCircle
              size={36}
              className="absolute left-[88%] bottom-[92%] bg-gray-600 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
            />
            <input
              type="file"
              multiple
              id="file"
              accept="image/*"
              className="hidden"
              onChange={onChangeImageUpload}
            />
          </label>
        )}
        <Typography
          color="dark"
          size="4xl"
          weight="bold"
          classNameStyles="text-center mt-2"
        >
          약속
        </Typography>
        <Typography
          size="2xl"
          color="primary"
          weight="semibold"
          classNameStyles="my-4 text-center"
        >
          {log?.description}
        </Typography>
        <Typography color="secondary" classNameStyles="my-2">
          아이가 약속을 기다리고 있어요
        </Typography>
        <Button fullWidth={true} disabled={!uploadImgUrl}>
          약속 인증하기
        </Button>
      </div>
    </div>
  );
};
