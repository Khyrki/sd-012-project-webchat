const users = require('../helpers/users');

const handleSocket = (socket, io) => {
  const randomNick = socket.id.slice(0, 16);
  socket.emit('getNickName', randomNick);

  users[socket.id] = randomNick.toString();
  io.emit('onlineUsers', users);
};

module.exports = handleSocket;
