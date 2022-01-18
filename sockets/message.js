const moment = require('moment');
const Messages = require('../models/Messages');

module.exports = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = new Date();

    const timestamp = moment(date).format('DD-MM-YYYY HH:MM:SS A');

    await Messages.createMessage({ message: chatMessage, nickname, timestamp });
  
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
};
