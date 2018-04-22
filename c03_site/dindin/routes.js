'use strict';

const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');

module.exports = [{
  method: 'GET',
  path: '/{param*}',
  handler: Assets.servePublicDirectory
}];