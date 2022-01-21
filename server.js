const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

const onlineUsers = [];

io.on('connection', (socket) => {
  onlineUsers.push({ id: socket.id, nickname: socket.id });
  io.emit('onlineUsers', onlineUsers);

  socket.on('message', (message) => {
    io.emit('message', `${message.nickname}: ${message.chatMessage}`);
  });
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', (_req, res) => {
  res.render('webchat');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});