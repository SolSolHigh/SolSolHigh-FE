import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../apis/userApi';
import { HomeChild } from './HomeChild';
import { HomeParent } from './HomeParent';

export const HomeFetch = () => {
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
        <HomeParent parent={userinfoQuery.data.data} />
      ) : (
        <HomeChild child={userinfoQuery.data.data} />
      )}
    </>
  );
};
