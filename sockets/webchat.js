const moment = require('moment');
const { create } = require('../models');

let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    users.push({ id: socket.id, nickname: `Usuário ${socket.id}` });
    io.emit('users', users);

    socket.on('message', async ({ chatMessage, nickname }) => {
        const date = moment(new Date()).format('DD-MM-YYYY h:mm a');
        await create('messages', { message: chatMessage, nickname, timestamp: date });
    
        io.emit('message', `${date} - ${nickname} ${chatMessage}`);
    });

    socket.on('changeNickname', ({ id, newNickname }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      users[userIndex] = { id, nickname: newNickname };

      io.emit('users', users);
    });

    socket.on('disconnect', () => {
      users = users.filter(({ id }) => id !== socket.id);
      io.emit('connectedUsers', users);
    });
  });
};