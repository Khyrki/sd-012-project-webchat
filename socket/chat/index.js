const { getHistory } = require('../../models/chat');
const chat = require('./chat');
const user = require('./user');

const participants = [];

const changeNickName = (id, newNick) => {
  participants.forEach((participant, i) => {
    if (participant.id === id) {
      participants[i].nickName = newNick;
    }
  });
};

const removeParticipant = (id) => {
  const userIndex = participants.findIndex((participant) => participant.id === id);
  participants.splice(userIndex, 1);
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('cliente conectou!');
    const messages = await getHistory();
    chat(io, socket);
    user(io, socket, changeNickName, participants);
    messages.forEach(({ chatMessage, nickname, time }) => {
      socket.emit('messageHistory', `${time} ${nickname}: ${chatMessage}`);
    });
    console.log(participants);
    io.emit('participantChange', participants);
    socket.on('disconnect', () => {
      removeParticipant(socket.id);
      io.emit('participantChange', participants);
    });
  });
};