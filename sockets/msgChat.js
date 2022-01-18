const { geradorNome } = require('gerador-nome');
const moment = require('moment');

const history = [];

module.exports = (io) => io.on('connection', (socket) => {
    socket.emit('nick', geradorNome);

  socket.on('message', ({ chatMessage, nickname }) => {
    history.push({ nickname, chatMessage, Id: socket.id });

    const timeInMs = moment().format('DD-MM-YYYY HH:MM:SS A');

    io.emit('message', `${timeInMs} - ${nickname} ${chatMessage}`);
  });

  socket.on('change', (nick) => {
// localiza a mensagen 
    history.map((msg) => (msg.Id === socket.id ? { ...msg, nickname: nick } : msg));
    socket.emit('nick', nick);
  });
});