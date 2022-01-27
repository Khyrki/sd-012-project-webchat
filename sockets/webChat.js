module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('Boas-vindas!', 'Que bom que você aqui!');

    socket.on('client', (message) => {
      console.log(`Mensagem ${message}`);
      io.emit('server', message);
    });
  });
};
