import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import REQUEST_DOMAINS from '../apis/axiosConfig';
import { api } from '../apis/interceptors';

export const userHandler = new AxiosMockAdapter(api);

userHandler.onPost(`/${REQUEST_DOMAINS.auth}/users`).reply(200, {
  users: [{ id: 1, name: 'John Smith' }],
});
