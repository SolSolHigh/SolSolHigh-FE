import React, { useEffect, useState } from 'react';
import { Account as ParentAccountPage } from './Parent';
import { Account as ChildAccountPage } from './Child';
import { api } from '../../apis/interceptors';

export const Account = () => {
  const [isParent, setIsParent] = useState<boolean>(false);

  useEffect(() => {
    api.get(`/api/users/info`).then((response) => {
      setIsParent(response.data);
    });
  }, []);
  if (isParent) return <ParentAccountPage />;
  else return <ChildAccountPage />;
};
