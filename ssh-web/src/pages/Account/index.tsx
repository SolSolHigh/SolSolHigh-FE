import React, { useEffect, useState } from 'react';
import { Account as ParentAccountPage } from './Parent';
import { Account as ChildAccountPage } from './Child';
import { api } from '../../apis/interceptors';
import { showToast } from '../../utils/toastUtil';

export const Account = () => {
  const [isParent, setIsParent] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(`/api/users/info`)
      .then((response) => {
        if (response.data.type === 'PARENT') {
          setIsParent(true);
        } else {
          setIsParent(false);
        }
      })
      .catch((error: Error) => {
        showToast('error', '현재 유저의 정보를 불러오지 못했습니다.');
      });
  }, []);
  if (isParent) return <ParentAccountPage />;
  else return <ChildAccountPage />;
};
