const moment = require('moment');

const { create, searchAll } = require('../controllers/messages');

let users = [];

const nickNameUpdate = (id, newName) => users.map((user) => {
  if (user.id === id) { 
    return { ...user, nickname: newName };
  }
  return user;
});

module.exports = (io) => io.on('connection', async (socket) => {  
  const messages = await searchAll();
  
  socket.emit('reconnect', messages);
  
  users = [{ id: socket.id, nickname: socket.id.slice(0, 16) }, ...users];
  
  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
  
  socket.on('login', ({ newName }) => {
    users = nickNameUpdate(socket.id, newName);

    io.emit('userOnline', users);
  });
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await create(chatMessage, nickname, timestamp);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('disconnect', () => {
    const deleteUsers = users.filter((user) => user.id !== socket.id);

    users = deleteUsers;
    
    socket.broadcast.emit('userOnline', users);
  });
  
  io.emit('userOnline', users);
});