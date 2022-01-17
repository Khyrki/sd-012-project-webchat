const messageModel = require('../models/message');
const { formateTimestamp } = require('../helpers');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = new Date();
      const formatedTimestamp = formateTimestamp(date);
      console.log(`${formatedTimestamp} ${nickname} >> ${chatMessage}`);
      messageModel.create(chatMessage, nickname, formatedTimestamp);
      io.emit('message', `${formatedTimestamp} ${nickname} >> ${chatMessage}`);
    });
  });
};
