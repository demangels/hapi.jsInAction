'use strict';

const Boom = require('boom');
const Hapi = require('hapi');
const Netmask = require('netmask').Netmask;
const blacklist = [
  '12.166.96.32/27',
  '41.58.0.0/16',
  '41.66.192.0/18',
  '127.0.0.0/8'
];
const server = new Hapi.Server();

server.connection({port: 4000});

const blockIPs = function (request, reply) {
  const ip = request.info.remoteAddress;
  for (let i = 0; i < blacklist.length; ++i) {
    const block = new Netmask(blacklist[i]);
    if (block.contains(ip)) {
      console.log('Blocking request from ' + ip + '. Within blocked subnet ' + blacklist[i]);
      return reply(Boom.forbidden());
    }
  }
  reply.continue();
};
server.ext('onRequest', blockIPs);
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Greeting, you were allowed in.');
  }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Started server');
});

