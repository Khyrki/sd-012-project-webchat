const { addHistory } = require('../controllers/history');

const nicks = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', (nick) => {
    nicks.push(nick);
    io.emit('usersList', nicks);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString().replace('/', '-');
    addHistory({ timeStamp: date.replace('/', '-'), nickname, chatMessage });
    io.emit('message', `${date.replace('/', '-')} ${nickname}: ${chatMessage}`);
  });

  socket.on('updateNick', (newNick, old) => {
   const index = nicks.findIndex((nick) => nick === old);
   nicks[index] = newNick;
   io.emit('usersList', nicks);
  });
});
