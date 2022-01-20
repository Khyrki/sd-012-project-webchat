module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', message);
  });
  socket.on('clientUser', (nickname) => {
    io.emit('createUser', nickname);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `${socket.id} acabou de se desconectar! :(`);
  });
});