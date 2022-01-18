const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const messagesSocket = require('./sockets/messages');

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

app.get('/', (_req, res) => {
  res.status(200).render('chat');
});

messagesSocket(io);

httpServer.listen(3000);