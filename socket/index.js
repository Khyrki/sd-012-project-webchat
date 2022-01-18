const socketServer = (io) => {
  io.on('connection', (socket) => {
    console.log(`cliente ${socket.id} conectou`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateObj = new Date();
      const date = dateObj.toLocaleString('pt-BR').replace(/\//g, '-');
      const message = `${date} - ${nickname} ${chatMessage}`;
      io.emit('message', message);
    });
  });
};

module.exports = socketServer;
