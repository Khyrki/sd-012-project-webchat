const moment = require('moment');

let userList = [];

function handleMessage(io, socket) {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateAndTime = moment().format('DD-MM-yyyy  HH:mm:ss');
    const detailedMessage = `${dateAndTime} - ${nickname}: ${chatMessage}`;
    io.emit('message', detailedMessage);
  });
}

function handleNicknameChange(io, socket) {
  socket.on('nicknameChange', (nickname) => {
    userList = userList.filter((user) => (user.id !== socket.id));
    userList.push({ id: socket.id, nickname });
    io.emit('renderUserList', userList);
  });
}

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('generateNickname', socket.id.slice(0, -4));
  handleMessage(io, socket);
  handleNicknameChange(io, socket);
});
