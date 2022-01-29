const getFormatedDate = require('../utils/getFormatedDate');

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected`);
    socket.on('sendMessage', (messageObj) => {
      const date = getFormatedDate();
      io.emit('newMessage', { ...messageObj, date });
    });
  });