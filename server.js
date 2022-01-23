const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

const newNickname = require('./sockets/newNickname');

const onlineUsers = [];

io.on('connection', (socket) => {
  io.emit('setDefaultNickname');

  socket.on('newNickname', (nickname) => {
    newNickname(io, socket, nickname, onlineUsers);
  });

  socket.on('message', (message) => {
    const dateObj = new Date();
    const dateTime = dateObj.toLocaleString('pt-BR').replace(/\//g, '-');

    // código dateTime baseado no código do colega David Gonzaga: https://github.com/tryber/sd-012-project-webchat/pull/76/commits/e2d4ae2bbc7d0f6e63af094e42e7b31a1b6760c7
    
    io.emit('message', `${dateTime} - ${message.nickname}: ${message.chatMessage}`);
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