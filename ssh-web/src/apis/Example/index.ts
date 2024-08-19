import { api } from '../interceptors';
import REQUEST_DOMAINS from '../axiosConfig';
import { ExampleResponse } from '../../interfaces/Example';

export const getExamples = async (): Promise<ExampleResponse> => {
  try {
    const response = await api.get<ExampleResponse>(
      `${REQUEST_DOMAINS.auth}/examples`,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`나중에 에러 토스트에 띄울 메시지로 재가공해서 내보내기`);
  }
};
