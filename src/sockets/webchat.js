const { formatDate } = require('../helpers');
const { newMessage, getAllMessages } = require('../models/chat');

const connect = async (socket) => {
  const messages = await getAllMessages();
  console.log(messages);
  socket.emit('loadMessages', messages);
};

module.exports = (io) => io.on('connection', (socket) => {
  connect(socket);

  socket.on('message', async ({ nickname = 'Anonymous', chatMessage }) => {
    const date = new Date().toLocaleString();
    const formattedDate = formatDate(date);

    await newMessage({
      message: chatMessage,
      nickname,
      date: formattedDate,
    });

    io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('nickname', (nickname = socket.id.slice(0, 16)) => {
    io.emit('serverNickname', nickname);
  });
});