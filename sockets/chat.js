const date = require('../helpers/date');
const newId = require('../helpers/newId');

module.exports = (io, socket) => {
  const userId = newId();

  const broadcastMessage = ({ chatMessage, nickname }) => {
    const message = `${date()} - ${nickname || userId}: ${chatMessage}`;

    io.emit('message', message);
  };

  const changeNickname = ({ id, nickname }) => {
    socket.broadcast.emit('changeNickname', { id, nickname });
  };

  io.emit('userConnect', userId);
  socket.on('disconnect', () => { io.emit('userDisconnect', userId); });
  socket.on('message', broadcastMessage);
  socket.on('changeNickname', changeNickname);
};