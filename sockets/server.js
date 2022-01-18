const { format } = require('date-fns');
const axios = require('axios');

const users = [];

const createUser = (socket) => {
  const { id } = socket;
  const newId = id.slice(0, 16);
  users.push({ id, nickname: newId });
  socket.emit('newUser', newId);
};

const createMessage = (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
    await axios.post('http://localhost:3000', {
      chatMessage,
      nickname,
      timestamp,
      });
    });
};

const getMessages = async (socket) => {
  // const messages = await messagesModel.getAllMessages();
  const messages = await axios.post('http://localhost:3000/webchat', {});
  socket.emit('allMessages', messages);
};

const saveNickname = async (socket, io) => {
  socket.on('saveNickname', (nickname) => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    users[userIndex].nickname = nickname;
    io.emit('usersOnline', users);
  });
};

const usersOnline = (socket, io) => {
  socket.on('usersOnline', () => {
    io.emit('usersOnline', users);
  });
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    users.splice(userIndex, 1);
    io.emit('usersOnline', users);
  });
};

const messages = (io) => io.on('connection', (socket) => {
  createUser(socket);
  createMessage(socket, io);
  getMessages(socket);
  saveNickname(socket, io);
  usersOnline(socket, io);
  disconnectUser(socket, io);
});

module.exports = messages;