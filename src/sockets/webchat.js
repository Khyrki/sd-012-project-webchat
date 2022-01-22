const { formatDate } = require('../helpers');
const { newMessage, getAllMessages } = require('../models/chat');

const connect = async (socket) => {
  const messages = await getAllMessages();
  socket.emit('loadMessages', messages);
};

module.exports = (io) => io.on('connection', (socket) => {
  connect(socket);

  socket.on('message', async ({ nickname, chatMessage }) => {
    const date = new Date().toLocaleString();
    const formattedDate = formatDate(date);

    await newMessage({
      message: chatMessage,
      nickname,
      timestamp: formattedDate,
    });

    io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });
});