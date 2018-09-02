import { PUSHER, NOTIFICATIONS, GENERAL } from './config';

export default {
  PUSHER,
  ...NOTIFICATIONS,
  ...GENERAL
};