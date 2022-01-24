const chat = (io) => {
  io.on('connection', (socket) => {
    console.log(`Um usuário conectou em ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Um usuário desconectou em ${socket.id}`);
    });

    socket.on('message', (message) => {
      const dateMessage = new Date();
      const timeMessage = dateMessage.toLocaleTimeString();
      const editedDateMessage = dateMessage.toLocaleDateString().replaceAll('/', '-');
      const editedMessage = `${editedDateMessage} ${timeMessage}
      -${message.nickname}: ${message.chatMessage}`;

      io.emit('message', editedMessage);
      console.log(dateMessage, timeMessage, editedDateMessage, editedMessage);
    });
  });
};

module.exports = chat;