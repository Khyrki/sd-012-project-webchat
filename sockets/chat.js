const { formatMessage, removeSelectedUser } = require('../models/message');

let userList = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const formattedMessage = formatMessage(chatMessage, nickname);
    io.emit('message', formattedMessage);
  });
  socket.on('newUser', (nickname) => {
    userList.push({ id: socket.id, nickname });
    io.emit('newUser', userList);
  });
  socket.on('changeNick', (newNickname) => {
    userList = removeSelectedUser(socket.id, userList);
    userList.push({ id: socket.id, nickname: newNickname });
    io.emit('newUser', userList);
  });
  socket.on('disconnect', () => {
    userList = removeSelectedUser(socket.id, userList);
    io.emit('newUser', userList);
});
});
