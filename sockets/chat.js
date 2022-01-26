const { format } = require('date-fns');
const create = require('../models/create');
const list = require('../models/list');

let users = [];

const createMessages = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;

    await create(chatMessage, nickname, timestamp);
    console.log(`Mensagen - ${nickname}: ${chatMessage}`);
    io.emit('message', message);
  });
};

const getMessages = async (socket) => {
  const result = await list();

  socket.emit('getMessages', result);
};

const rename = async (socket, io) => {
  socket.on('rename', (userName) => {
    users.forEach((item) => {
      const renomear = item;
      if (item.id === socket.id) {
        renomear.nickname = userName;
      }
      io.emit('list', users);
    });
  });
};

const onDisconnect = (socket, io) => {
  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);

    io.emit('list', users);
  });
};

module.exports = (io) => io.on('connection', async (socket) => {
  const nickname = socket.id.slice(0, 16);
  socket.emit('nickname', nickname);
  users.push({ id: socket.id, nickname });
  io.emit('list', users);

  createMessages(socket, io);
  getMessages(socket);
  rename(socket, io);
  onDisconnect(socket, io);
});
