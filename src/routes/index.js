import pushMessage from './pushMessage';
import request from './request'

const addRoute = (route, handler, fastify) => handler(route, fastify);

const routes = async (fastify, options) => {
  addRoute('/notify/:message', pushMessage, fastify);
  addRoute('/request', request, fastify)
};

export default routes;
