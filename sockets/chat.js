const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

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
    io.emit('message',
    `${date.getDate()}-0${date.getMonth() + 1}-${date
      .getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date
      .getSeconds()} - ${nickname}: ${chatMessage}`);
  });
});