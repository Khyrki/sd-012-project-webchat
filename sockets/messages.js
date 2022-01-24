function client(socket) {
  socket.on('message', ({ nickname, message }) => {
    const userMessage = {
      date: new Date(),
      nickname,
      message,
    };

  socket.broadcast.send(message);
  socket.send(message);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
