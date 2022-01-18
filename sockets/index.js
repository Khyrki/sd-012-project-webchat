const moment = require('moment');

let users = [];

const nickNameUpdate = (id, newName) => users.map((user) => {
  if (user.id === id) { 
    return { ...user, nickname: newName };
  }
  return user;
});

module.exports = (io) => io.on('connection', (socket) => {
  users = [{ id: socket.id, nickname: socket.id.slice(0, 16) }, ...users];

  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');

  socket.on('login', ({ newName }) => {
    const newUsers = nickNameUpdate(socket.id, newName);

    users = newUsers;

    io.emit('userOnline', users);
  });

  socket.on('message', ({ chatMessage, nickname }) => {   
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    const deleteUsers = users.filter((user) => user.id !== socket.id);

    users = deleteUsers;

    socket.broadcast.emit('userOnline', users);
  });

  io.emit('userOnline', users);
});