const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { createMsgHistory } = require('../models');

// Biblioteca baixada e requisito 2 feito com a ajuda do colega Cristiano Lima!
const randomName = () => {
  const random = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return random.substring(0, 16);
};

module.exports = (io) => io.on('connection', (socket) => {
  const randomNickname = randomName();
  socket.emit('nickname', randomNickname);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    const dateMsg = `${date.getDate()}-0${date.getMonth() + 1}-${date
      .getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date
      .getSeconds()}`;
    io.emit('message',
    `${dateMsg} - ${nickname}: ${chatMessage}`);
    createMsgHistory(chatMessage, nickname, dateMsg);
  });
});