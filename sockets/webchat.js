const message = require('./message');
const newUser = require('./newUser');
const updateNick = require('./updateNick');
const disconnect = require('./disconnect');

const onlineUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  message(io, socket);

  newUser(io, socket, onlineUsers);

  updateNick(io, socket, onlineUsers);

  disconnect(io, socket, onlineUsers);
});
