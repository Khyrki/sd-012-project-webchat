const { saveMessage } = require('../controllers/chatController');

/* Array de Users online */
const users = [];

/* funçoes no socket para criação de usuario, mensagem, atualização de nickname */
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nickName) => {
    users.push(nickName);
    io.emit('updateUsersList', users);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace('/', '-');
    const response = `${time.replace('/', '-')} ${nickname}: ${chatMessage}`;
    saveMessage({ timeStamp: time.replace('/', '-'), nickname, chatMessage });
    io.emit('message', response);
  });

  socket.on('updateNickname', (newNick, oldNick) => {
    const positionInArray = users.findIndex((user) => user === oldNick);
    users[positionInArray] = newNick;
    io.emit('updateUsersList', users);
  });
});