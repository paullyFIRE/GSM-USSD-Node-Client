import fastifyPlugin from 'fastify-plugin';
import uuid from 'uuid/v4';
import Config from '../../config';
import { processRequest } from './modemRequest'

const modemService = async (fastify, options, next) => {
  const modemRequest = async requestPath =>
    new Promise(async (resolve, reject) => {
      const requestId = uuid();
      const requestTime = Date.now();

      await fastify.notifyBeginRequest({ requestId, requestTime, requestPath });
      // call modem and get answer
      console.log('Calling process request')
      const responsePath = await processRequest(requestPath)

      // notify and return response
      const requestEndTime = Date.now();
      
      await fastify.notifyEndRequest({
        requestId,
        requestTime,
        requestEndTime,
        requestPath,
        responsePath: requestPath.map(item => ({
          request: item,
          response: 'null'
        }))
      });
  });

  fastify.decorate('runModemRequest', modemRequest);
  next();
};

export default fastifyPlugin(modemService);
