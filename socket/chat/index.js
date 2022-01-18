const { getHistory } = require('../../models/chat');
const chat = require('./chat');

const participants = new Set();

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('cliente conectou!');
    // const messages = await getHistory();
    participants.add({ id: socket.id, nickName: socket.nickName });
    chat(io, socket);
    io.emit('nickName', socket.id);
    io.emit('participantChange', participants);
    // io.emit('messageHistory', messages);
  });

  io.on('disconnect', (socket) => {
    participants.forEach((participant) => {
      if (participant.id === socket.id) {
        participants.delete(participant);
      }
    });

    io.emit('participantChange', participants);
  });
};