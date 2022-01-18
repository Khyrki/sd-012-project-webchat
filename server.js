const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');

app.set('views', './views');

require('./sockets/msgChat')(io);

httpServer.listen(3000, () => console.log('listening on port 3000'));