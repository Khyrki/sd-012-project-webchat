const moment = require('moment');
const createMessage = require('../models/createMessage');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:MM:SS A');

    const info = {
      message: chatMessage,
      nickname,
      timestamp,
    };
    
    await createMessage(info);
    
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});