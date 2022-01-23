function client(socket) {
  socket.on('message', ({ nickname, message }) => {
    const userMessage = {
      date: new Date(),
      nickname,
      message,
    };

    console.log(userMessage);
  });
}

function server(io) {
  io.on('connection', client);
}

module.exports = server;
