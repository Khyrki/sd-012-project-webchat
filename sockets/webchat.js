const moment = require('moment');
const { create } = require('../models');

let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    users.push({ id: socket.id, nickname: `Usuário ${socket.id}` });
    io.emit('users', users);

    socket.on('message', async ({ chatMessage, nickname }) => {
        const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
        await create({ message: chatMessage, nickname, timestamp: date }, 'messages');
        io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('changeNickName', ({ id, nickname }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      users[userIndex] = { id, nickname };

      io.emit('users', users);
    });

    socket.on('disconnect', () => {
      users = users.filter(({ id }) => id !== socket.id);
      io.emit('users', users);
    });
  });
};