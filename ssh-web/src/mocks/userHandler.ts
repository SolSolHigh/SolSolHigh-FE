import { mock } from './index';
import REQUEST_DOMAINS from '../apis/axiosConfig';
import { UserResponse } from '../interfaces/User';

mock.onPost(`/${REQUEST_DOMAINS.auth}/users`).reply<UserResponse>(200, {
  users: [{ id: 1, name: 'John Smith' }],
});
