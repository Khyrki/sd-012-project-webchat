const moment = require('moment');
const chat = require('../models/chat');

const users = [];
// agradeço ao kevin por ter tirado um tempo para me auxiliar nessa relação do socket com os event listener
// estára referenciado no server.js
module.exports = (io) => io.on('connection', (socket) => {
  // ao receber um impulso do eventListener message envia registra no banco de dados a mensagem no formato
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeInMs = moment().format('DD-MM-YYYY HH:MM:SS A');
    await chat.registerMessage({ message: chatMessage, nickname, timestamp: timeInMs });
    io.emit('message', `${timeInMs} : ${nickname} => ${chatMessage}`);
  });
    // ao receber um impulso do eventListener adiciona o id ao array  emite uma chamada para  o event users no ejs
    socket.on('newUser', (nickname) => {
      users.push({ id: socket.id, nickname });
      io.emit('users', users);
    });
      // ao receber um impulso do eventListener atualiza o nickname pelo id e   emite uma chamada para  o event users no ejs
      socket.on('updateNick', (nickname) => {
        const user = users.find(({ id }) => id === socket.id);
        user.nickname = nickname;
        io.emit('users', users);
      });
  // remove o  usuario(id) da lista do array iterando o array e removendo ele pelo metodo splice que remove ou substitui o 
  // elemento de acordo com a localização que vocẽ indica
  socket.on('disconnect', () => {
    const userLoc = users.findIndex(({ id }) => id === socket.id);
    users.splice(userLoc, userLoc + 1); io.emit('users', users);
  });
});