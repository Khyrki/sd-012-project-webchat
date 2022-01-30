const dateTimeFormater = require('../../helpers/dateTimeFormatter');

const { findAllMessages, postMessages } = require('../../models/message');

const chatMessage = (io) => {
  io.on('connection', async (socket) => {
    const allMessages = await findAllMessages();
    // console.log(allMessages);
    socket.emit('findAllMessages', allMessages);

    socket.on('message', async (message) => {
      io.emit('message', `${dateTimeFormater()} - ${message.nickname}: ${message.chatMessage}`);
      await postMessages(message.chatMessage, message.nickname, dateTimeFormater());
    });
  });
};

module.exports = chatMessage; 
