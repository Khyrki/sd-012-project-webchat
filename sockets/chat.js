const { create } = require('../models/index');

let usersList = [];
const time = new Date();
const timestamp = time.toLocaleString('es-CL', { timeZone: 'UTC' });

const updatesUsers = ({ newNickname, oldNickname }) => {
  usersList = usersList.map((user) => {
    if (oldNickname === user.id) return { user: newNickname, id: oldNickname };
    return user;
  });
  return usersList;
};

module.exports = (io) => io.on('connection', (socket) => {
  const user = socket.id.slice(0, 16);

  socket.emit('online', user);
  usersList.push({ user, id: user });

  io.emit('listsUsers', usersList);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const msg = `${timestamp} ${nickname} ${chatMessage}`;
    await create({ chatMessage, nickname, timestamp });
    io.emit('message', msg);
  });

  socket.on('newNickname', ({ newNickname, oldNickname }) => {
    const updated = updatesUsers({ newNickname, oldNickname });
    io.emit('listsUsers', updated);
  });

  socket.on('disconnect', () => {
    usersList = usersList.filter(({ id: userId }) => userId !== socket.id.slice(0, 16));
    io.emit('listsUsers', usersList);
  });
});