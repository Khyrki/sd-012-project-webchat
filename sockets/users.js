const { createUser } = require('../models/userModel');

function client(socket) {
  socket.on('userAdd', async (nickname) => {
    socket.broadcast.emit('serverMessage', nickname);
    createUser(socket.id, nickname)
      .then(console.log)
      .catch(console.err);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
