'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Accept = require('accept');
const server = new Hapi.Server({
  app: {
    i18n: {
      supportedLanguages: ['en', 'fr', 'zh'],
      defaultLanguage: 'en'
    }
  }
});

server.connection({port: 4000});
server.register([
  require('vision')
], (err) => {
  if (err) {
    throw err;
  }
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    path: Path.join(__dirname, 'templates'),
  });
  server.handler('i18n-view', (route, options) => {
    const view = options.view;
    const context = options.context;
    return function (request, reply) {
      const settings = server.settings.app.i18n;
      const langs = Accept.languages(request.headers['accept-language']);
      for (let i = 0; i < langs.length; ++i) {
        if (settings.supportedLanguages.indexOf(langs[i]) !== -1) {
          return reply.view(view + '_' + langs[i], context);
        }
      }
      reply.view(view + '_' + settings.defaultLanguage, context);
    }
  });
  server.route([{
    method: 'GET',
    path: '/',
    handler: {
      'i18n-view': {
        view: 'index',
        context: {name: 'steven'}
      }
    }
  }]);
  server.start(() => {
    console.log('Started server at', server.info.uri);
  });
});