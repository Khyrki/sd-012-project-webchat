const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

const newNickname = require('./sockets/newNickname');
const disconnectUser = require('./sockets/disconnectUser');
const { saveMessages, getMessages } = require('./models');

const onlineUsers = [];

const chatHistory = async () => {
  const history = await getMessages();
  return history;
};

io.on('connection', async (socket) => {
  io.emit('setDefaultNickname');
  io.emit('chatHistory', await chatHistory());

  socket.on('newNickname', (nickname) => {
    newNickname(io, socket, nickname, onlineUsers);
  });

  socket.on('message', async (message) => {
    const dateObj = new Date();
    const dateTime = dateObj.toLocaleString('pt-BR').replace(/\//g, '-');

    // código dateTime baseado no código do colega David Gonzaga: https://github.com/tryber/sd-012-project-webchat/pull/76/commits/e2d4ae2bbc7d0f6e63af094e42e7b31a1b6760c7
    
    const messageObject = {
      message: message.chatMessage,
      nickname: message.nickname,
      timestamp: dateTime,
    };

    await saveMessages(messageObject);

    io.emit('message', `${dateTime} - ${message.nickname}: ${message.chatMessage}`);
  });

  socket.on('disconnect', () => disconnectUser(io, socket, onlineUsers));
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', (_req, res) => {
  res.render('webchat');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});