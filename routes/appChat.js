const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const modelMsg = require('../helpers/modelMsg');
const { OK } = require('../helpers/variables');

const app = express();

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateFormated = modelMsg(chatMessage, nickname);
    io.emit('message', dateFormated);
  });
});

app.set('view engine', 'ejs');
app.set('views', '..=/views');

app.get('/', (_req, res) => {
  res.status(OK).render('chat');
});

module.exports = httpServer;