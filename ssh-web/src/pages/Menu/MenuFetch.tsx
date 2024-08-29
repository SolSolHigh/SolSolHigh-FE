import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { getUserInfo } from '../../apis/userApi';
import { MenuParent } from './MenuParent';
import { MenuChild } from './MenuChild';

export const MenuFetch = () => {
  const userinfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userinfoQuery.error && !userinfoQuery.isFetching) {
    throw userinfoQuery.error;
  }

  return (
    <>
      {userinfoQuery.data.data.type === 'PARENT' ? (
        <MenuParent parent={userinfoQuery.data.data} />
      ) : (
        <MenuChild child={userinfoQuery.data.data} />
      )}
    </>
  );
};
