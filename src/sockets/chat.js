module.exports = (io) => io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected`);
    socket.on('sendMessage', (messageObj) => {
      io.emit('newMessage', messageObj);
    });
  });