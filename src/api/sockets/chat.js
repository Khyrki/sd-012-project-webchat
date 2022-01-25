const { formatTime, formatTimeDB } = require('../helper/formatTime');
const { create } = require('../models/chatModel');

const usersOnlineArray = [];

const newConnection = (io, socket) => {
  const { id } = socket;
  const initialNick = id.slice(0, -4);
  usersOnlineArray.push({ id, nick: initialNick });
  io.emit('onlineList', usersOnlineArray);
  console.log(`Usuario conectou! ID: ${id}`);
  console.log(usersOnlineArray);
  
  socket.emit('hello', 
    { msg: 'Olá, seja bem vindo ao nosso chat público!', initialNick });
};

const message = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await create({ message: chatMessage, nickname, timestamp: formatTimeDB(new Date()) });
    io.emit('message', `${formatTime(new Date())} - ${nickname}: ${chatMessage}`);
    console.log(`O ${nickname} enviou a mensagem: ${chatMessage}`);
  });
};

const changeNick = (io, socket) => {
  socket.on('changeNick', async (newNick) => {
    const userIndex = usersOnlineArray.findIndex((user) => user.id === socket.id);
    const oldNick = usersOnlineArray[userIndex].nick;
    usersOnlineArray[userIndex].nick = newNick;
    io.emit('onlineList', usersOnlineArray);
    console.log(`O ${oldNick} mudou o nick para ${newNick}`);
    console.log(usersOnlineArray);
  });
};

const disconnection = (io, socket) => {
  socket.on('disconnect', async () => {
    const userIndex = usersOnlineArray.findIndex((user) => user.id === socket.id);
    usersOnlineArray.splice(userIndex, 1);
    io.emit('onlineList', usersOnlineArray);
    console.log(`O ${socket.id} desconectou`);
    console.log(usersOnlineArray);
   });
};

module.exports = (io) => io.on('connection', (socket) => {
  newConnection(io, socket);
  message(io, socket);
  changeNick(io, socket);
  disconnection(io, socket);
});