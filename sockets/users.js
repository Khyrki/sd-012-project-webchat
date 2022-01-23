function client(socket) {
  socket.on('userAdd', (nickname) => {
    socket.broadcast.emit('serverMessage', `${nickname} Acabou de entrar`);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
