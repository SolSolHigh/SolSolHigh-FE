import AxiosMockAdapter from 'axios-mock-adapter';
import { api } from '../apis/interceptors';

export const mock = new AxiosMockAdapter(api);

// 핸들러 파일들 로드
require('./userHandler');
require('./exampleHandler');
