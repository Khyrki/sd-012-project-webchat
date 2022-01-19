const getTime = require('../utils/getTime');
const nameGenerator = require('../utils/nameGenerator');

const nicknames = [];

module.exports = (io) => io.on('connection', (socket) => {
  let nickname = nameGenerator();
  nicknames.push(nickname);

  io.emit('connection', nicknames);
  
  socket.on('message', ({ chatMessage }) => {
    const { data, hour } = getTime();
    io.emit('message', `${data} ${hour} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', (newNickname) => {
    const index = nicknames.indexOf(nickname);
    nicknames[index] = newNickname;
    nickname = newNickname;
  });
});