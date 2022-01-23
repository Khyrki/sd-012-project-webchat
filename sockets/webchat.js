const moment = require('moment');
const model = require('../models');

const onlineUsers = [];

const messageSocket = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const userMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', userMessage);
    model.createMessage({ chatMessage, nickname, timestamp });
  });
};

const updateNicknameSocket = (io, socket) => {
  socket.on('updateNickname', (newNickname) => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) onlineUsers[index].nickname = newNickname;
    });
    io.emit('connection', onlineUsers);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    const client = {
      nickname: socket.id.substring(0, 16),
      id: socket.id,
    };

    onlineUsers.push(client);
    console.log(`${socket.id} just arrived.`);

    socket.emit('welcome', `${socket.id} just arrived.`);
    io.emit('connection', onlineUsers);

    messageSocket(io, socket);
    updateNicknameSocket(io, socket);

    socket.on('disconnect', () => {
      onlineUsers.forEach(({ id }, index) => {
        if (socket.id === id) onlineUsers.splice(index, 1);
      });
      io.emit('connection', onlineUsers);
    });
  });
};