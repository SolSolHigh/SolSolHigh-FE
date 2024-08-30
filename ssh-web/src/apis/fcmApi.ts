import { api } from './interceptors';

export const postFcmToken = (fcmToken: string | undefined) => {
  return api.post('/api/fcm', fcmToken);
};
