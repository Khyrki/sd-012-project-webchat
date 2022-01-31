const { format } = require('date-fns');
const { create, find } = require('../models/messages');

const usuarios = [];

const createMessage = async (socket, io) => {
  const { id } = socket;
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
    await create({ nickname, chatMessage, timestamp });
  });
};

const createUser = async (socket) => {
  const { id } = socket;
  const nickClient = id.slice(0, 16);
  usuarios.push({ id, nickname: nickClient });
  socket.emit('newUser', nickClient);
  //   o socket esta gerando um  usuario aleatorio , ao gerar um id.
};

const getUsers = (socket, io) => {
  socket.on('usuariosOnline', () => {
    io.emit('usuariosOnline', usuarios);
  });
};

const salvarNick = async (socket, io) => {
  socket.on('saveNick', (nickname) => {
    const index = usuarios.findIndex((u) => u.id === socket.id);
    usuarios[index].nickname = nickname;
    io.emit('usuariosOnline', usuarios);
  });
};

const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const index = usuarios.findIndex((u) => u.id === socket.id);
    usuarios.splice(index, 1);
    io.emit('usuariosOnline', usuarios);
  });
};

const getAllMessages = async (socket) => {
  const messages = await find();
  socket.emit('messagesAll', messages);
};

const messages = (io) =>
  io.on('connection', (socket) => {
    createMessage(socket, io);
    createUser(socket);
    getUsers(socket, io);
    salvarNick(socket, io);
    disconnect(socket, io);
    getAllMessages(socket);
  });

module.exports = messages;
