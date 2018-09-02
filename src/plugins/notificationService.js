import fastifyPlugin from 'fastify-plugin';
import moment from 'moment';
import Pusher from 'pusher';
import Config from '../config';

const notificationService = async (fastify, options, next) => {
  const { PUSHER, pingChannel, pingEvent, timeStampFormat } = Config;

  const pusher = new Pusher({
    ...PUSHER
  });

  const notify = message =>
    new Promise((resolve, reject) => {
      try {
        pusher.trigger(pingChannel, pingEvent, message);
        resolve();
      } catch (err) {
        reject(new Error(err.message));
      }
    });

  const notifyBeginRequest = ({ requestId, requestTime, requestPath }) =>
    notify({
      status: 'request_begin',
      requestId,
      requestPath,
      requestTime: moment(requestTime).format(timeStampFormat)
    });

  const notifyEndRequest = ({
    requestId,
    requestTime,
    requestEndTime,
    responsePath
  }) =>
    notify({
      status: 'request_end',
      requestId,
      requestTime: moment(requestTime).format(timeStampFormat),
      requestDuration: moment(moment(requestEndTime).diff(moment(requestTime))).format("s[s]"),
      responsePath
    });

  fastify.decorate('notify', notify);
  fastify.decorate('notifyBeginRequest', notifyBeginRequest);
  fastify.decorate('notifyEndRequest', notifyEndRequest);
  next();
};

export default fastifyPlugin(notificationService);
