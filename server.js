const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const messagesSocket = require('./sockets/messages');
const usersSocket = require('./sockets/users');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(path.resolve(__dirname, '/public')));

app.get('/', (_req, res) => {
  res.status(200).render('chat');
});

messagesSocket(io);
usersSocket(io);

httpServer.listen(3000);