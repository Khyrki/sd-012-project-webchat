const ala = () => {
    const date = new Date();
    const formattedDate = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const time = `${formattedDate} ${formattedTime}`;
    return time;
};
const { postMessages, getMessages } = require('../models/MessageModel');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const messages = await getMessages();
    socket.emit('loadMessages', messages);

    socket.on('message', async (message) => {
      io.emit('message', `${ala()} - ${message.nickname}: ${message.chatMessage}`);
      await postMessages(message.chatMessage, message.nickname, ala());
    });
  });
};