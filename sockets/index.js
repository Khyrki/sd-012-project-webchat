const moment = require('moment');

let users = [];

const nockNameUpdate = (id, newName) => users.map((user) => {
  if (user.id === id) { 
    return { ...user, nickname: newName };
  }
  return user;
});

const nicknameFind = (id) => users.find((user) => user.id === id);

module.exports = (io) => io.on('connection', (socket) => {
  users = [...users, { id: socket.id, nickname: socket.id.slice(0, 16) }];

  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');

  socket.on('login', ({ newName }) => {
    const newUsers = nockNameUpdate(socket.id, newName);

    users = newUsers;

    io.emit('userOnline', users);
  });

  socket.on('message', ({ chatMessage }) => {
    const user = nicknameFind(socket.id);

    io.emit('message', `${timestamp} - ${user.nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    const deleteUsers = users.filter((user) => user.id !== socket.id);

    users = deleteUsers;

    socket.broadcast.emit();
  });

  io.emit('userOnline', users);
});