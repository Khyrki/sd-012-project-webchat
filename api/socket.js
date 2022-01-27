const { createServer } = require('http');
const { Server } = require('socket.io');

const app = require('./express');

const httpServer = createServer(app);

const { PORT = 3000 } = process.env;
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('../sockets/message')(io);
require('../sockets/user')(io);

module.exports = httpServer;
