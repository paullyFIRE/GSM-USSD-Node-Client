const {
  PUSHER_API,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
  NOTIFICATION_REQUEST_CHANNEL,
  NOTIFICATION_REQUEST_EVENT,
  MODEM_NETWORK,
  RPI_ID
} = process.env;

export const PUSHER = {
  appId: PUSHER_API,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER
};

export const NOTIFICATIONS = {
  pingChannel: NOTIFICATION_REQUEST_CHANNEL,
  pingEvent: `${NOTIFICATION_REQUEST_EVENT}-${MODEM_NETWORK}-${RPI_ID}`,
  timeStampFormat: 'ddd MMM Do, YYYY hh:mm:ss A Z'
};

export const GENERAL = {
  deviceId: RPI_ID
};
