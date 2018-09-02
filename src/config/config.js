export default {
   pingChannel: 'RPI-STATUS',
   pingEvent: 'uptime-ping',
   timeStampFormat: 'ddd MMM Do, YYYY hh:mm:ss A Z',
   appId: process.env.PUSHER_API,
   key: process.env.PUSHER_KEY,
   secret: process.env.PUSHER_SECRET,
   cluster: process.env.PUSHER_CLUSTER
 }