const Hapi = require('hapi');
const Fs = require('fs');
const Path = require('path');
const server = new Hapi.Server({});

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
    path: Path.join(__dirname, 'templates')
  });
  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index');
    }
  }, {
    config: {
      payload: {
        parse: true,
        output: 'stream'
      }
    },
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {
      const upload = request.payload.upload;
      const uploadName = Path.basename(request.payload.upload.hapi.filename);
      const destination = Path.join(__dirname, 'uploads', uploadName);
      upload.pipe(Fs.createWriteStream(destination));
      reply('ok');
    }
  }]);
  server.start(() => {
    console.log('Started server at ' + server.info.uri);
  });
});
