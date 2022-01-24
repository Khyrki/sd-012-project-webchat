/* eslint-disable max-lines-per-function */
const moment = require('moment');
const { saveMsgs } = require('../helpers/api');

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
let users = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} entrou na sala!`)
  let randomNick = socket.id.slice(0, 16);
  users.unshift(randomNick);

  io.emit('nickname', ({ users, randomNick }));
  
  socket.on('changenick', (nickname) => {
    const index = users.indexOf(randomNick);
    users.splice(index, 1, nickname);
    randomNick = nickname;
    io.emit('attUsers', (users));
  });

  socket.on('disconnect', () => {
    console.log('serverMessage', `Xiii! ${randomNick} acabou de se desconectar! :(`);
    users = users.filter((user) => user !== randomNick);

    io.emit('attUsers', (users));
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    await saveMsgs({ message: chatMessage, nickname, timestamp });

    io.emit('message', `${timestamp} ${nickname} ${chatMessage}`);
  });
});
