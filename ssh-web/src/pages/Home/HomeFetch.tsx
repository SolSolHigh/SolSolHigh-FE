import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../apis/userApi';
import { HomeChild } from './HomeChild';

export const HomeFetch = () => {
  const userinfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userinfoQuery.error && !userinfoQuery.isFetching) {
    throw userinfoQuery.error;
  }

  console.log(userinfoQuery.data.data);
  return (
    <>
      {userinfoQuery.data.data.type === 'PARENT' ? (
        ''
      ) : (
        <HomeChild child={userinfoQuery.data.data} />
      )}
    </>
  );
};
