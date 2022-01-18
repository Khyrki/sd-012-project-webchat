const { 
  formatMessage, removeSelectedUser, getAllMessages, saveMessage,
} = require('../models/message');

let userList = [];

module.exports = (io) => io.on('connection', async (socket) => {
  socket.emit('allMessages', await getAllMessages());

  socket.on('message', ({ chatMessage, nickname }) => {
    saveMessage(nickname, chatMessage, formatMessage());
    io.emit('message', `${formatMessage()} - ${nickname}: ${chatMessage}`);
  });
  socket.on('newUser', (nickname) => {
    userList.push({ id: socket.id, nickname });
    io.emit('newUser', userList);
  });
  socket.on('changeNick', (newNick) => {
    userList = removeSelectedUser(socket.id, userList);
    userList.push({ id: socket.id, nickname: newNick });
    io.emit('newUser', userList);
  });
  socket.on('disconnect', () => {
    userList = removeSelectedUser(socket.id, userList);
    io.emit('newUser', userList);
  });
});
