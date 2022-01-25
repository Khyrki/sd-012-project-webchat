const getDateTime = require('../helpers/getDateTime');
const saveMessages = require('../models/insertMessages');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      const dateTime = getDateTime();
      await saveMessages(dateTime, chatMessage, nickname);
      const formattedMsg = `${dateTime} ${nickname}: ${chatMessage}`;
      io.emit('message', formattedMsg);
    });
  });
};
