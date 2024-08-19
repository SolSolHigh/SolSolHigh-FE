import { api } from '../interceptors';
import REQUEST_DOMAINS from '../axiosConfig';
import { ExampleResponse } from '../../interfaces/Example';
import { showToast } from '../../utils/toastUtil';

export const getExamples = async (): Promise<ExampleResponse> => {
  try {
    const response = await api.get<ExampleResponse>(
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
