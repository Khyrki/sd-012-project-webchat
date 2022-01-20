const randomNick = require('../helpers/randomNick');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('joinRoom', () => {
    const nickname = randomNick(16);
    io.emit('createUser', { id, nickname });
  });
  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', { id, message });
  });
  socket.on('clientUser', (nickname) => {
    io.emit('createUser', { id, nickname });
  });
  socket.on('disconnect', () => {
    const message = 'acabou de desconectar.';
    socket.broadcast.emit('serverMessage', { id, message });
    io.emit('deleteUser', { id });
  });
});