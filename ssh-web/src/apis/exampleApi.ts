import REQUEST_DOMAINS from './axiosConfig';
import { showToast } from '../utils/toastUtil';
import { api } from './interceptors';
import { IExampleResponse } from '../interfaces/exampleInterface';

// ============= Example Test ======================
export const getExample1 = () => {
  return api({
    url: `${REQUEST_DOMAINS.auth}/examples`,
    method: 'get',
  });
};

export const getExample2 = () => {
  return api.get<IExampleResponse>(`${REQUEST_DOMAINS.auth}/examples`);
};

export const getExamples = async (): Promise<IExampleResponse> => {
  try {
    const response = await api.get<IExampleResponse>(
      `${REQUEST_DOMAINS.auth}/examples`,
    );
    showToast('success', '성공 메시지 띄우기');

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    showToast('error', '실패 에러 메시지 띄우기');
    throw new Error(`나중에 에러 토스트에 띄울 메시지로 재가공해서 내보내기`);
  }
};
// ============= Example Test ======================
