const Hapi = require('hapi');
const Joi = require('joi');
const server = new Hapi.Server();
const schema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  location: Joi.string().required(),
  dob: Joi.date().required()
};

server.connection({port: 4000});
server.route({
  method: 'GET',
  path: '/people/{id}',
  handler: function (request, reply) {
    const people = [{
      firstName: 'Xiang',
      lastName: 'Zheng',
      age: 48,
      location: 'Singapore',
      dob: '1967-03-02'
    }, {
      firstName: 'Emma',
      lastName: 'Ashdown',
      age: 'millennial',
      location: 'UK',
      dob: '1990-01-01'
    }];
    reply(people[request.params.id - 1]);
  },
  config: {
    response: {
      schema: schema
    }
  }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});