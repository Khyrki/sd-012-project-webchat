const { gettingDateAndTime } = require('../utils/functions');
const chatModel = require('../models/chat');
const disconnect = require('./disconnect');

const users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = gettingDateAndTime();
      const message = `${date} ${nickname}: ${chatMessage}`;
      await chatModel.insertOne({ message: chatMessage, nickname, timestamp: date });
      io.emit('message', message);
    });
    socket.on('newUser', (nickname) => {
      users.push({ nickname, id: socket.id });
      io.emit('newUser', users);
    });
    socket.on('nickUpdate', (nickname) => {
      const user = users.find(({ id }) => id === socket.id);
      user.nickname = nickname;
      io.emit('nickUpdate', users);
    });
    disconnect(socket, users);
  });
};
