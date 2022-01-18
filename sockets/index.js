// const languages = require('../controllers/languages');
// const LanguageModel = require('../models/languages');
const { format } = require('date-fns');
const axios = require('axios');

let users = [];

const createMessage = (chatMessage, nickname, io) => {
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  axios.post('http://localhost:3000', {
    chatMessage,
    nickname,
    timestamp,
  });
};
const messages = (io) => io.on('connection', (socket) => {
  let id = socket.id.slice(0, 16);
  users.push(id);
  socket.broadcast.emit('connection', id);

  socket.emit('usersConected', users);

  socket.on('updateNickname', ({ lastUser, updatedUser }) => {
    id = updatedUser;
    users = users.map((value) => (value === lastUser ? updatedUser : value));
    socket.broadcast.emit('updateUsers', lastUser, updatedUser);
  });
  
  socket.on('message', (msg) => {
    createMessage(msg.chatMessage, msg.nickname, io);
  });

  socket.on('disconnect', () => {
    users = users.filter((value) => value !== id);
    socket.broadcast.emit('logout', id);
  });
});

module.exports = messages;