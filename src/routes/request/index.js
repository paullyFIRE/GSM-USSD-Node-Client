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

    reply.send(`Thanks for the ${network} request. Here is the response:\n${responseDialog}`);
  });

export default request;
