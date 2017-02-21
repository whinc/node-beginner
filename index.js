const server = require('./src/server'),
      router = require('./src/router').router;

server.start(router);