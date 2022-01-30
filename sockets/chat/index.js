const date = require('../../utils/createDate');
const saveMessage = require('../../models/chat');

const usersNames = [];

const newUser = (io, socket) => {
  socket.on('newUser', (nickname) => {
    usersNames.push({ id: socket.id, nickname });
    io.emit('onlineUsers', usersNames);
  });
};

const newNickname = (io, socket) => {
  socket.on('newNickname', (nickname) => {
    const users = usersNames.find(({ id }) => id === socket.id);
    users.nickname = nickname;
    io.emit('onlineUsers', usersNames);
  });
};

const disconnect = (io, socket) => {
  socket.on('disconnect', (nickname) => {
      const users = usersNames.findIndex(({ id }) => id === socket.id);
  usersNames.splice(users, users + 1);
    users.nickname = nickname;
    io.emit('onlineUsers', usersNames);
  });
};

const messages = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${date(new Date())} - ${nickname}: ${chatMessage}`);
    await saveMessage.save({
      nickname,
      message: chatMessage,
    });
  });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    io.emit('onlineUsers', usersNames);
    socket.emit('welcome', 'Seja benvindo ao chat!');
    newUser(io, socket);
    newNickname(io, socket);
    messages(io, socket);
    disconnect(io, socket);
    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage');
    });
  });
};
