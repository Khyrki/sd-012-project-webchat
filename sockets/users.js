const userModel = require('../models/userModel');
const messageModel = require('../models/messageModel');

function client(socket) {
  socket.on('user', async (nickname) => {
    socket.broadcast.emit('newUser', nickname);
    // await userModel.create(socket.id, nickname);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
