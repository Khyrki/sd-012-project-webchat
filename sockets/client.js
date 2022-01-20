const moment = require('moment');
const Message = require('../models/messages');

const clients = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:MM:SS A');
    await Message.create({ message: chatMessage, nickname, timestamp: date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('create', (nickname) => {
    clients.push({ id: socket.id, nickname });
    io.emit('online', clients);
  });

  socket.on('updateNickname', (nickname) => {
    // clients.splice(clients.indexOf(clients.find((client) => client.id === socket.id)), 1);
    // clients.push({ id: socket.id, nickname });
    const updatedClient = clients.find((client) => client.id === socket.id);
    updatedClient.nickname = nickname;
    io.emit('online', clients);
  });

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(clients.find((client) => client.id === socket.id)), 1);
    io.emit('online', clients);
  });
});

// io socket online
