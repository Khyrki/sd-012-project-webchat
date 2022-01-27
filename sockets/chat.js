const { newMessage } = require('../controllers/chat');

const allUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nickName) => {
    allUsers.push(nickName);
    io.emit('updateAllUsers', allUsers);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace('/', '-');
    const response = `${time.replace('/', '-')} ${nickname}: ${chatMessage}`;
    newMessage({ timeStamp: time.replace('/', '-'), nickname, chatMessage });
    io.emit('message', response);
  });

  socket.on('attUserName', (newUser, oldUser) => {
    const arrIndex = allUsers.findIndex((user) => user === oldUser);
    allUsers[arrIndex] = newUser;
    io.emit('updateAllUsers', allUsers);
  });
});