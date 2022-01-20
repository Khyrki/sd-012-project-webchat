const getDate = require('../helpers/modelDate');
const users = require('../helpers/users');
const { newMsg } = require('../models/message');
const handleSocket = require('../controllers/handleSocket');

module.exports = (io) => {
  io.on('connection', (socket) => {
    handleSocket(socket, io);

    socket.on('upNickName', (nickName) => {
      socket.emit('getNickName', nickName);
      users[socket.id] = nickName;
      io.emit('onlineUsers', users);
    });

    socket.on('message', ({ nickname, chatMessage }) => {
      const date = getDate();
      newMsg({ message: chatMessage, nickname, timestamp: date });
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('onlineUsers', users);
    });
  });
};