const moment = require('moment');
const { createMessages } = require('../models');

const usersOnline = [];

const messageSocket = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const userMessage = `${timestamp} - ${nickname}: ${chatMessage}`;

    io.emit('message', userMessage);

    createMessages(chatMessage, nickname, timestamp);
  });
};

const changeNickSocket = (socket, io) => {
  socket.on('changeNick', (newNickname) => {
    usersOnline.forEach((user, index) => {
      if (user.id === socket.id) {
        usersOnline[index].nickname = newNickname;
      }
    });

    io.emit('connection', usersOnline);
  });
};

const disconnectSocket = (socket, io) => {
  socket.on('disconnect', () => {
    usersOnline.forEach((user, index) => {
      if (user.id === socket.id) {
        usersOnline.splice(index, 1);
      } 
    });

    io.emit('connection', usersOnline);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    io.emit('welcome', 'Bem-vindo ao chat da Uol');
    const newNick = socket.id.substring(0, 16);
    usersOnline.push({ nickname: newNick, id: socket.id });
    io.emit('connection', usersOnline);
    socket.emit('randonNick', newNick);
    socket.on('nickname', (nickname) => {
      socket.emit('newNickname', nickname);
    });

    socket.on('changeNick', (nick) => {
      console.log(nick);
    });

    disconnectSocket(socket, io);
    changeNickSocket(socket, io);
    messageSocket(socket, io);
  });
};