const scheme = {};

const pushMessage = (route, fastify) =>
  fastify.get(route, { scheme }, async (req, reply) => {
    const { message } = req.params;

    fastify
      .notify(message)
      .then(() => reply.send('Message Sent.'))
      .catch(err => reply.send(`Something went wrong ${err.message}`));
  });

export default pushMessage;
