const allUsers = [];

/* funçoes no socket para criação de usuario e mensagem */
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nickName) => {
    allUsers.push(nickName);
    io.emit('updateAllUsers', allUsers);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace('/', '-');
    const response = `${time.replace('/', '-')} ${nickname}: ${chatMessage}`;
    io.emit('message', response);
  });

  socket.on('attUserName', (newUser, oldUser) => {
    const arrIndex = allUsers.findIndex((user) => user === oldUser);
    allUsers[arrIndex] = newUser;
    io.emit('updateAllUsers', allUsers);
  });
});