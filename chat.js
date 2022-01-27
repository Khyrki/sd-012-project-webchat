const { changeNickname, createUser, insertMessage, excludeUser } = require('./Utils/chat');
const { savedMessageDB } = require('./models/messages');

const timestamp = `${new Date().toLocaleString('en-GB')
.replaceAll('/', '-').replace(',', '')}`;

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      insertMessage(`${timestamp} - ${nickname}: ${chatMessage}`);
      savedMessageDB({ message: chatMessage, nickname, timestamp });

      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });

    socket.on('createUser', ({ originalNickname }) => {
      io.emit('changeNickname', createUser(socket, originalNickname));
    });

    socket.on('changeNickname', ({ originalNickname, nickname }) => {
      io.emit('changeNickname', changeNickname(socket, originalNickname, nickname));
    });

    socket.on('disconnect', () => {
      io.emit('changeNickname', excludeUser(socket));
    });
  });
};