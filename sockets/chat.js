const users = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nickName) => {
    users.push(nickName);
    io.emit('updateUsersList', users);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace('/', '-');

    io.emit('message', `${time.replace('/', '-')} ${nickname}: ${chatMessage}`);
  });
});