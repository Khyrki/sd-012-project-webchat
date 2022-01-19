module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, roomOption }) => {
    socket.join(roomOption);

    socket.emit('serverMessage', `Bem vindo ${username} a sala sobre ${roomOption}`);

    socket.broadcast.to(roomOption).emit('serverMessage', `${username} acabou de entrar na sala`);

    socket.on('roomClientMessage', ({ message, room }) => {
      io
        .to(room)
        .emit('serverMessage', `${username}: ${message}`);
    });
  });
});