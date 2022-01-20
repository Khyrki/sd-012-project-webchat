const chat = require('./chat');

const usuarios = [];

const genRandomNick = () => {
  const randomNick = Array.from(Array(16), 
    () => Math.floor(Math.random() * 36).toString(36)).join('');
  return randomNick;
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Cliente de ID "${socket.id}" se conectou!`);

    const initialNickName = genRandomNick();

    usuarios.push({ id: socket.id, nickName: initialNickName });

    socket.emit('nickName', initialNickName);

    chat(io, socket);

    socket.on('changeNickName', ({ nickName }) => {
      usuarios.forEach((usuario, index) => {
        if (usuario.id === socket.id) usuarios[index].nickName = nickName;
      });
    });
  });

  io.on('disconnect', (socket) => {
    const disconnectedUser = usuarios.findIndex((usuario) => usuario.id === socket.id);
    usuarios.splice(disconnectedUser, 1);
  });
};