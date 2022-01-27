const MessageModel = require('../../models/message');
const date = require('../../helpers/date');

module.exports = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = date();
    const message = { message: chatMessage, nickname, timestamp };

    await MessageModel.addNewMessage(message);

    const formattedMessage = `${timestamp} - ${nickname}: ${chatMessage}`;

    io.emit('message', formattedMessage);
  });
};
