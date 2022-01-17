const http = require('http');
const socket = require('socket.io');
const express = require('./express');

const httpServer = http.createServer(express);

const io = socket(
  httpServer,
  {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  },
);

require('../sockets/message')(io);
require('../sockets/user')(io);

module.exports = httpServer;
