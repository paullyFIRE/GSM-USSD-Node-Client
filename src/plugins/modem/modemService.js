import fastifyPlugin from 'fastify-plugin';
import uuid from 'uuid/v4';
import Config from '../../config';
import { processRequest } from './modemRequest';
import logger from '../../lib/logger';

const modemService = async (fastify, options, next) => {
  const modemRequest = async requestPath =>
    new Promise(async (resolve, reject) => {
      const requestId = uuid();
      const requestTime = Date.now();

      await fastify.notifyBeginRequest({ requestId, requestTime, requestPath });
      // call modem and get answer
      const responsePath = await processRequest(requestPath);

      // notify and return response
      const requestEndTime = Date.now();

      await fastify.notifyEndRequest({
        requestId,
        requestTime,
        requestEndTime,
        requestPath,
        responsePath
      });

      logger.log('info', `Successful request - ${requestId}, ${requestTime}, ${responsePath}`);

      resolve({
        requestId,
        requestTime,
        responsePath
      });
    });

  fastify.decorate('runModemRequest', modemRequest);
  next();
};

export default fastifyPlugin(modemService);
