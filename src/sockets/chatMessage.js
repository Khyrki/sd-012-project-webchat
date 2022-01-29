const dateTimeFormater = require('../helpers/dateTimeFormatter');

const chatMessage = (io) => {
  io.on('connection', async (socket) => {
    socket.on('message', async (message) => {
      io.emit('message', `${dateTimeFormater()} - ${message.nickname}: ${message.chatMessage}`);
    });
  });
};

module.exports = chatMessage;
