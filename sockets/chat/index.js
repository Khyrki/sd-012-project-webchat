const date = require('../../utils/createDate');
const saveMessage = require('../../models/chat');

const usersNames = [];
const chat = (io) => {
  io.on('connection', async (socket) => {
    console.log(`usuario conectado, id: ${socket.id}`);
    socket.emit('welcome', 'Seja benvindo ao chat!');

    socket.on('onlineUsers', (users) => {
      usersNames.push(users);

      io.emit('onlineUsers', usersNames);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      io.emit('message', `${date(new Date())} - ${nickname}: ${chatMessage}`);
      await saveMessage.save({
        nickname,
        message: chatMessage,
      });
    });
  });
};

module.exports = { chat };
