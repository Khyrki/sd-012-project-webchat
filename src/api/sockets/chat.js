const { formatTime, formatTimeDB } = require('../helper/formatTime');
const { create } = require('../models/chatModel');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Usuario conectou! ID: ${id}`);
  const initialNick = id.slice(0, -4);
  
  socket.emit('hello', 
    { msg: 'Olá, seja bem vindo ao nosso chat público!', initialNick });
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    console.log(`O ${nickname} enviou a mensagem: ${chatMessage}`);
    await create({ message: chatMessage, nickname, timestamp: formatTimeDB(new Date()) });
    io.emit('message', `${formatTime(new Date())} - ${nickname}: ${chatMessage}`);
  });
});