const chat = require('./chat');

let usuarios = [];

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
    
    io.emit('nickName', usuarios);
    
    chat(io, socket);
    
    socket.on('changeNickName', (nickName) => {
      usuarios.forEach((usuario, index) => {
        if (usuario.id === socket.id) usuarios[index].nickName = nickName;
      });
      io.emit('nickName', usuarios);
    });

    socket.on('disconnect', () => {
      console.log(`Cliente de ID "${socket.id}" se desconectou!`);
      usuarios = usuarios.filter((usuario) => usuario.id !== socket.id);
      io.emit('nickName', usuarios);
    });
  });
};