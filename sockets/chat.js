const moment = require('moment');
const Message = require('../models/message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = moment().format('DD-MM-YYYY HH:MM:SS A');
      await Message.createMes({
        message: chatMessage,
        nickname,
        timestamp: date,
      });
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
  });
}; 