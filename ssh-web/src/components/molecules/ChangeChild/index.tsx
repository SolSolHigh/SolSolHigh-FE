import React, { useEffect, useState } from 'react';
import { AvatarWithLabel } from '../AvatarWithLabel';
import { Button } from '../../atoms/Button';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { api } from '../../../apis/interceptors';
import { IChild } from '../../../interfaces/userInterface';
import { getImgSrc } from '../../../utils/userUtil';

export const ChangeChild = () => {
  const [childrenList, setChildrenList] = useState<IChild[]>([]);
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [childImg, setChildImg] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    api.get(`/api/parents/children`).then((res) => {
      setChildrenList(res.data);
      setIsLoading(false);
    });
  });

  useEffect(() => {
    setChildImg(getImgSrc(childrenList[selectedChild]?.gender, 'CHILD'));
  }, []);

  return (
    <div className="flex flex-row relative items-center mb-2 p-2 px-4 rounded-lg space-x-3">
      {selectedChild !== 0 && (
        <FaArrowAltCircleLeft
          size={24}
          onClick={() => {
            if (childrenList && childrenList.length > selectedChild - 2) {
              setSelectedChild(selectedChild - 1);
            }
          }}
        />
      )}
      <AvatarWithLabel
        imageUrl={childImg}
        altText="캐릭터"
        size="md"
        bgColor="blue"
        label={childrenList[selectedChild]?.name}
        labelSize="md"
        labelWeight="bold"
        labelColor="dark"
        classNameStyles="bg-primary-100 p-2 rounded-lg"
      ></AvatarWithLabel>

      <FaArrowAltCircleRight
        className={
          selectedChild !== childrenList.length - 1 ? 'visible' : 'invisible'
        }
        size={24}
        onClick={() => {
          if (childrenList && childrenList.length > selectedChild - 1) {
            setSelectedChild(selectedChild + 1);
          }
        }}
      />
    </div>
  );
};
