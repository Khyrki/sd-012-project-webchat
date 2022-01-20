const crypto = require('crypto');

const MessageModel = require('../models/Message');
const { formatDate } = require('../utils');

const connectSocket = (io, socket, username, nicknames) => {
  io.emit('connect-user', { username, id: socket.id });
    
  socket.emit('history-users', nicknames);
  
  nicknames.push({ username, id: socket.id });
};

const messageSocket = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = formatDate(new Date());

    await MessageModel.create({ message: chatMessage, nickname, timestamp: date });

    const message = `${date} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
};

module.exports = (io) => {
  let nicknames = [];

  io.on('connection', (socket) => {
    const username = crypto.randomBytes(16).toString('hex').substring(0, 16);
    
    connectSocket(io, socket, username, nicknames);
    
    messageSocket(io, socket);

    socket.on('change-name', (newName) => {
      const { id } = socket;

      const index = nicknames
        .indexOf(nicknames.find((user) => user.id === id));

      nicknames[index].username = newName;

      io.emit('change-name', { newName, id });
    });

    socket.on('disconnect', () => {
      const { id } = socket;

      nicknames = nicknames.filter((user) => user.id !== id);

      socket.broadcast.emit('disconnect-user', id);
    });
  });
};
