function client(socket) {
  socket.on('userAdd', async (nickname) => {
    socket.broadcast.emit('serverMessage', nickname);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
