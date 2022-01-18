const { gettingDateAndTime } = require('../utils/functions');
const chatModel = require('../models/chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Uma pessoa com id: ${socket.id} se conectou.`);
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = gettingDateAndTime();
      const message = `${date} ${nickname}: ${chatMessage}`;
      await chatModel.insertOne({ message: chatMessage, nickname, timestamp: date});
      io.emit('message', message);
    });
  });
};
