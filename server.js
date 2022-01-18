const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

require('./sockets/webchat')(io);

http.listen(3000, () => console.log('listening on port 3000'));
