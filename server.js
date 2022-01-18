const express = require('express');

const app = express();

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const controllerChat = require('./controller/chat');

app.set('view engine', 'ejs');

app.set('views', './views');

require('./sockets/msgChat')(io);

app.get('/', controllerChat);

httpServer.listen(3000, () => console.log('listening on port 3000'));