import React from 'react';
import { MissionFetch } from './child';

// 리팩토링 필요: 요하 라우터, 서스펜스쿼리 처리에 따라 맞추기
const Mission = () => {
  return <MissionFetch />;
};

export default Mission;
