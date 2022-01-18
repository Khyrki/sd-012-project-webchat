const users = [];

/* funçoes no socket para criação de usuario e mensagem */
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nickName) => {
    users.push(nickName);
    io.emit('updateUsersList', users);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace('/', '-');
    const response = `${time.replace('/', '-')} ${nickname}: ${chatMessage}`;
    io.emit('message', response);
  });

  socket.on('updateNickname', (newNick, oldNick) => {
    const positionInArray = users.findIndex((user) => user === oldNick);
    users[positionInArray] = newNick;
    io.emit('updateUsersList', users);
  });
});