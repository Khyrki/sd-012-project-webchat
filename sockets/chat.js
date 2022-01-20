const { addMessage } = require('../models/servModel');

let userList = [];

const updateNickname = (socket, io) => {
  socket.on('updateNickname', ({ nickname, id }) => {
    userList = userList.map((el) => (
    el.id === id ? { ...el, nick: nickname } : el
    ));
    io.emit('listUser', userList);
});
};

module.exports = (io) => io.on('connection', (socket) => {
  const nick = socket.id.slice(0, 16);
  socket.emit('init', (nick));

  userList.push({ nick, id: socket.id });
  io.emit('listUser', userList);
  console.log(`Usuário conectado. ID: ${socket.id}`);

  socket.on('disconnect', () => {
    userList = userList.filter((e) => e.id !== socket.id);
    io.emit('listUser', userList);
  });

  updateNickname(socket, io);

  socket.on('message', ({ nickname, chatMessage }) => {
    let firstNickname = nickname;
    if (nickname === '') firstNickname = socket.id;
    const time = new Date().toLocaleString('es-CL', { timeZone: 'UTC' });
    const msg = `${time} ${firstNickname}: ${chatMessage}`;
    addMessage(chatMessage, firstNickname, time);
    io.emit('message', msg);
  });
});
