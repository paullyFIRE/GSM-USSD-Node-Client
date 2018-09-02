const scheme = {
  body: {
    type: 'object',
    properties: {
      network: { type: 'string' },
      requestPath: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string'
        },
      }
    }
  }
};

const request = (route, fastify) =>
  fastify.post(route, { scheme }, async (req, reply) => {
    const { network, requestPath } = req.body;

    const responseDialog = await fastify.runModemRequest(requestPath);

    reply.send(responseDialog);
  });

export default request;
