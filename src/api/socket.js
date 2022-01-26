const model = require('../models');

const onlineUsers = [];
let client = {};

const updateUserNickname = (io, socket) => {
  socket.on('nickname', (nickname) => {
    onlineUsers.forEach((user, index) => {
      if (user.id === socket.id) {
        onlineUsers[index].nickname = nickname;
        client = {
          nickname,
          id: socket.id,
        };
        io.emit('nickname', client);
      }
    });
    io.emit('connection', onlineUsers);
  });
};

const sendNewMessage = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const message = {
      chatMessage,
      nickname,
    };
    const newMessage = await model.newMessage(message);
    
    io.emit('message', newMessage);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Conexão com o client ${socket.id} foi estabelecida!`);
  
  client = {
    nickname: socket.id.substring(0, 16),
    id: socket.id,
  };

  io.emit('nickname', client);

  onlineUsers.push(client);

  updateUserNickname(io, socket);
  sendNewMessage(io, socket);

  socket.on('disconnect', () => {
    onlineUsers.forEach(({ id }, index) => {
      if (socket.id === id) {
        onlineUsers.splice(index, 1);
      }
    });
    io.emit('connection', onlineUsers);
  });

  io.emit('connection', onlineUsers);
});