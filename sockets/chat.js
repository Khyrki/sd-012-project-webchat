const { format } = require('date-fns');
const create = require('../models/create');
const getAll = require('../models/get');

let newUser = [];

const createMessage = (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', async ({ chatMessage, nickname }) => {
    await create(nickname, chatMessage, timestamp);
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
  });
};

const createToken = (socket) => {
  const nickname = [...Array(16)]
    .map((_i) => Math.floor(Math.random() * 36).toString(36))
    .join('');
  newUser.push({ nickname, id: socket.id });
  socket.emit('token', nickname);
};

const userLog = (io) => {
  io.emit('newUser', newUser);
};

const findAll = async (socket) => {
  const allData = await getAll();
  socket.emit('allData', allData);
};

const newNickname = (socket, io) => {
  socket.on('newNickname', (nickname) => {
    newUser.forEach((user) => {
      const findUser = user;
      if (findUser.id === socket.id) {
        findUser.nickname = nickname;
      }
    });
    io.emit('newUser', newUser);
  });
};

const userLogout = (socket, io) => {
  socket.on('disconnect', () => {
    newUser = newUser.filter((user) => user.id !== socket.id);
    io.emit('newUser', newUser);
  });
};

const messages = (io) => io.on('connection', (socket) => {
  createMessage(socket, io);
  createToken(socket);
  findAll(socket);
  userLog(io);
  newNickname(socket, io);
  userLogout(socket, io);
});
module.exports = messages;
