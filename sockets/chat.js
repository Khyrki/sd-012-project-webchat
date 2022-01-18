module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Uma nova conexão com ${socket.id} foi estabelecida!`);

    socket.on('newMessage', ({}) => {

    });
  // socket.emit('evento', []);
  });
};
