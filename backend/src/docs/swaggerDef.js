const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'CS3219 Task B API documentation',
    version,
  },
  servers: [
    {
      url: `${config.httpScheme}://${config.host}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
