const chat = (io) => {
  io.on('connection', (socket) => {
    console.log(`usuario conectado, id: ${socket.id}`);
    socket.on('clientMessage', (message) => {
      io.emit('serverMessage', message);
      console.log(`Mensagem ${message}`);
    });
  });
};

module.exports = { chat };
