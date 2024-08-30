import React from 'react';
import { Account as ParentAccountPage } from './Parent';
import { Account as ChildAccountPage } from './Child';

interface AccountProps {
  isParent: boolean;
}

export const Account = ({ isParent }: AccountProps) => {
  if (isParent) return <ParentAccountPage />;
  else return <ChildAccountPage />;
};
