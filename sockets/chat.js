const { formatMessage } = require('../models/message');

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
  socket.on('changeNick', ({ oldNickname, newNickname }) => {
    const removeOld = userList.filter((item) => item.nickname !== oldNickname);
    removeOld.push({ id: socket.id, nickname: newNickname });
    userList = removeOld;
    io.emit('newUser', userList);
  });
});
