server.method('readKey1', (request, reply) => {
  Fs.readFile('key1.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    reply(data.trim());
  });
});
server.method('readKey2', (request, reply) => {
  Fs.readFile('key2.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    reply(data.trim());
  });
});
server.method('decryptMessage', (request, reply) => {
  const decipher = Crypto.createDecipher('aes-256-cbc', request.pre.readKey1 + request.pre.readKey2);
  ...
});
server.route({
  ...
  config: {
    pre: [
      [
        'readKey1',
        'readKey2'
      ],
      'decryptMessage',
      'convertMessage'
    ]
  }
});