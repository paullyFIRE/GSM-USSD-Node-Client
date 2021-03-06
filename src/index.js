import 'dotenv/config';
import fastify from 'fastify';
import helmet from 'fastify-helmet';
import { notify, modem } from './plugins';
import routes from './routes';
import logger from './lib/logger';

const server = fastify({ logger: true });

server.register(helmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' } });
server.register(notify);
server.register(modem);
server.register(routes);

server.listen(3000, '0.0.0.0', err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  logger.log('info', 'Server running on port 3000');
});
